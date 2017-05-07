from django.db.models import Q
from rest_framework import permissions
from rest_framework import serializers
from rest_framework import viewsets

from application.api import IsFriends, router
from core.models import User
from friendship.models import Friendship


class UserSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    username = serializers.ReadOnlyField()
    first_name = serializers.ReadOnlyField()
    last_name = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'avatar')


class FullUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'last_name', 'first_name', 'email', 'avatar')


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = FullUserSerializer
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsFriends)

    def get_serializer_class(self):
        user = self.request.user
        if Friendship.objects.filter(Q(sender=user) | Q(receiver=user)).filter(status=True):
            serializer_class = FullUserSerializer
        else:
            serializer_class = UserSerializer

        return serializer_class

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.query_params.get('me'):
            qs = qs.filter(id=self.request.user.id)
        return qs

router.register(r'users', UserViewSet)
