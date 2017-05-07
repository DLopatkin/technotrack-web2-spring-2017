from rest_framework import permissions
from rest_framework import routers

from friendship.models import Friendship, Subscription

router = routers.DefaultRouter()


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.author == request.user or request.user.is_staff


class IsOwnerOrStaff(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.author == request.user or request.user.is_staff


class IsFriends(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS and \
               (Friendship.objects.filter(sender=request.user, receiver=obj, status=True).exists() or
                Friendship.objects.filter(sender=obj, receiver=request.user, status=True).exists()):
            return True

        return obj == request.user  # or request.user.is_staff


class IsSubscribed(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return request.method in permissions.SAFE_METHODS and \
               Subscription.objects.filter(author=request.user, target=obj.author).exists()
