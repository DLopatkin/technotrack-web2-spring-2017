from django.contrib import admin
from django.contrib.contenttypes.admin import GenericInlineModelAdmin

from like.models import Like


class LikesInline(admin.StackedInline, GenericInlineModelAdmin):
    model = Like
    ct_field = 'target_content_type'
    ct_fk_field = 'target_id'
    extra = 0


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    pass
