from django.contrib import admin

from friendship.models import Friendship, Friends

admin.site.register([Friendship, Friends, ])
