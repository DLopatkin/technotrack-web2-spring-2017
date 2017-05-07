from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models

from core.models import Authored, Dated


class Like(Dated, Authored):
    target_content_type = models.ForeignKey(ContentType)
    target_id = models.PositiveIntegerField()
    target = GenericForeignKey('target_content_type', 'target_id')


class Likeable(models.Model):
    likes = GenericRelation(
        Like,
        content_type_field='target_content_type',
        object_id_field='target_id'
    )


