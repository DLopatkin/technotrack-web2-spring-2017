from django.db.models import Q
from rest_framework import permissions
from rest_framework import serializers
from rest_framework import viewsets

from application.api import IsFriends, router
from core.models import User
from friendship.models import Friendship


class FriendshipSerializer(serializers.ModelSerializer):
    sender = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    receiver = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Friendship
        fields = ('id', 'sender', 'receiver',)


class RequestSerializer(serializers.ModelSerializer):
    sender = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    receiver = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Friendship
        fields = ('id', 'sender', 'receiver', 'status')


class RequestsViewSet(viewsets.ModelViewSet):
    serializer_class = RequestSerializer
    queryset = Friendship.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user,)

    def get_queryset(self):
        qs = super().get_queryset().select_related('sender', 'receiver')
        user = self.request.user
        qs = qs.filter(Q(sender=user) | Q(receiver=user)).filter(status=False)
        return qs


class FriendsViewSet(viewsets.ModelViewSet):
    serializer_class = FriendshipSerializer
    queryset = Friendship.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsFriends)

    def get_queryset(self):
        qs = super().get_queryset().select_related('sender', 'receiver')
        if self.request.query_params.get('user'):
            user = self.request.query_params.get('user')
            qs = qs.filter(Q(sender=user) | Q(receiver=user)).filter(status=True)
        else:
            user = self.request.user
            qs = qs.filter(Q(sender=user) | Q(receiver=user)).filter(status=True)
        return qs


router.register(r'friend_request', RequestsViewSet, 'friend_request')
router.register(r'friends', FriendsViewSet, 'friends')
