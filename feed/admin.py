from django.contrib import admin

from feed.models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    pass