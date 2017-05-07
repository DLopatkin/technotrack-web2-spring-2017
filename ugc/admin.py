from django.contrib import admin

from like.admin import LikesInline
from ugc.models import Post, Comment


class CommentInline(admin.StackedInline):

    model = Comment
    fk_name = 'target'


class PostInline(admin.StackedInline):

    model = Post
    can_delete = True
    extra = 0


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):

    inlines = CommentInline, LikesInline,


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):

    pass
