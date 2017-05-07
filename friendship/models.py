from django.contrib.contenttypes.fields import GenericRelation
from django.db import models

from core.models import User, Authored, Titled
from feed.models import Eventable, Event


class Subscription(Authored, Titled):
    target = models.ForeignKey(User, blank=False, related_name='target')

    def get_description(self):
        return '{} has subscribed on {}'.format(self.author.username, self.friend.username)

    def get_author(self):
        return self.author

    class Meta:
        unique_together = (('author', 'target'),)


class Friendship(models.Model):
    sender = models.ForeignKey(User, blank=False, related_name='sender')
    receiver = models.ForeignKey(User, blank=False, related_name='receiver')
    status = models.BooleanField(default=False)
    event = GenericRelation(
        Event,
        content_type_field='content_type',
        object_id_field='object_id'
    )

    def get_description(self):
        return '{} and {} are friends now!'.format(self.sender.username, self.receiver.username)

    def get_author(self):
        return self.sender

    class Meta:
        unique_together = (('sender', 'receiver'),)
