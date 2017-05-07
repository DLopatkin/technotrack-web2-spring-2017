from rest_framework import permissions
from rest_framework import serializers
from rest_framework import viewsets

from application.api import router
from feed.models import Event
from friendship.api import FriendshipSerializer
from friendship.models import Friendship, Subscription
from ugc.api import PostSerializer
from ugc.models import Post


class ContentObjectRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, Post):
            serializer = PostSerializer(value)
        elif isinstance(value, Friendship):
            serializer = FriendshipSerializer(value)
        else:
            raise Exception("Unexpected type of object")
        return serializer.data


class EventSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')
    title = serializers.ReadOnlyField(source='__str__')
    content_object = ContentObjectRelatedField(read_only=True)

    class Meta:
        model = Event
        fields = ('id', 'author', 'title', 'content_object', )


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = permissions.IsAuthenticated,

    def get_queryset(self):
        qs = super().get_queryset().prefetch_related('content_object').select_related('author')
        if self.request.query_params.get('user') and \
                Subscription.objects.filter(author=self.request.user,
                                            target=self.request.query_params.get('user')).exists():
            subscriptions = Subscription.objects.filter(author=self.request.query_params.get('user')).\
                values_list('target')
            qs = qs.filter(author__in=subscriptions)
        else:
            subscriptions = Subscription.objects.filter(author=self.request.user).values_list('target')
            qs = qs.filter(author__in=subscriptions)

        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

router.register('events', EventViewSet)