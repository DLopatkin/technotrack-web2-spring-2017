from django.db import models

from core.models import Authored, Dated, Titled
from feed.models import Eventable
from like.models import Like, Likeable


class Post(Authored, Dated, Titled, Eventable, Likeable):

    def get_description(self):
        return '{} added post.'.format(self.get_author())

    def get_author(self):
        return self.author

    text = models.CharField(max_length=1024, blank=False)
    image = models.ImageField(blank=True)
    attachment = models.FileField(upload_to='uploads/%Y/%m/%d/', blank=True)


class Comment(Authored, Dated, Likeable):
    text = models.TextField(blank=False, max_length=256)
    target = models.ForeignKey(Post)
