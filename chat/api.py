from rest_framework import serializers, viewsets, permissions

from application.api import IsOwnerOrReadOnly, router
from core.api import UserSerializer, FullUserSerializer
from core.models import User
from friendship.models import Subscription
from .models import Chat, UserChat, Message


class MessageSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')

    class Meta:
        model = Message
        fields = ['id','content', 'author', 'chat', ]


class ChatSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='get_title')

    class Meta:
        model = Chat
        fields = ['pk', 'title', 'author', 'created', ]


class UserChatSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    chat = serializers.PrimaryKeyRelatedField(queryset=Chat.objects.all())

    class Meta:
        model = UserChat
        fields = ['chat', 'user']


class ChatViewSet(viewsets.ModelViewSet):

    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.query_params.get('user'):
            if self.request.user.is_staff or \
                            UserChat.objects.filter(user=self.request.user).exists():
                chats = UserChat.objects.filter(user=self.request.query_params.get('user')).values_list('chat')
                qs = qs.filter(id__in=chats)
            else:
                qs.none()
        else:
            qs.none()
        return qs


class IsChatOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.chat.author == request.user or request.user.is_staff


class UserChatViewSet(viewsets.ModelViewSet):
    queryset = UserChat.objects.all()
    serializer_class = UserChatSerializer
    permission_classes = (permissions.IsAuthenticated, IsChatOwnerOrReadOnly)

    def get_queryset(self):
        qs = super().get_queryset().select_related('chat', 'user')
        if self.request.query_params.get('chat'):
            qs = qs.filter(chat=self.request.query_params.get('chat'))
            if not Subscription.objects.filter(user=self.request.user, chat=self.request.query_params.get('chat'))\
                    .exists() or not self.request.user.is_staff:
                qs.none()
        else:
            qs.none()
        return qs


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        qs = super().get_queryset().select_related('chat')
        chat_id = self.request.query_params.get('chat')
        if chat_id:
            if self.request.user.is_staff or \
                    UserChat.objects.filter(user=self.request.user).exists():
                qs = qs.filter(chat=chat_id)
            else:
                qs.none()
        else:
            qs.none()

        return qs

router.register('chats', ChatViewSet, 'chats')
router.register('userchats', UserChatViewSet, 'userchats')
router.register('messages', MessageViewSet, 'messages')
