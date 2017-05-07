from django.contrib.contenttypes.fields import GenericRelation, GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

from core.models import Titled, Authored


class Event(Authored, Titled):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return self.get_title()


class Eventable(models.Model):
    event = GenericRelation(
        Event,
        content_type_field='content_type',
        object_id_field='object_id'
    )

    def get_description(self):
        raise NotImplementedError

    def get_author(self):
        raise NotImplementedError

    class Meta:
        abstract = True
