from django.db import models

from core.models import Authored, Dated
from ugc.models import Post


class Like(Dated, Authored):
    post = models.ForeignKey(Post, blank=False, related_name='post')

    class Meta:
        unique_together = ('author', 'post')
