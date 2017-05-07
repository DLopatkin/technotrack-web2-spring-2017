from django.contrib import admin

from friendship.models import Friendship, Subscription


@admin.register(Friendship)
class FriendshipAdmin(admin.ModelAdmin):
    pass


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    pass
