from __future__ import unicode_literals

import uuid as uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils import timezone


class User(AbstractUser):
    avatar = models.ImageField('Photo', blank=True, upload_to='avatars')
    confirmed = models.BooleanField(default=False)


class Authored(models.Model):
    author = models.ForeignKey(User)

    class Meta:
        abstract = True


class Dated(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Titled(models.Model):
    title = models.CharField(max_length=50, blank=False)

    def get_title(self):
        return self.title

    class Meta:
        abstract = True


class AccountValidation(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, unique=True)
    user = models.OneToOneField(User, related_name=u'confirmation', blank=False )
    created = models.DateTimeField(auto_now_add=True)
    confirmed_date = models.DateTimeField(editable=True, blank=True, null=True)
    confirmed = models.BooleanField(default=False )

    class Meta:
        verbose_name = u'Account confirmation'

    def confirm(self):
        self.user.confirmed = True
        self.user.save()
        self.confirmed = True
        self.confirmed_date = timezone.now()
        self.save()

    def update_uuid(self):
        from .tasks import send_activation_email
        self.uuid = uuid.uuid4()
        self.created = timezone.now()
        self.save()
        send_activation_email.apply_async([self.user.id, ])

    def __str__(self):
        return self.user.username

    def get_absolute_url(self):
        return 'http://localhost:8000{}'.format(reverse('core:confirmation', kwargs={
            'pk': self.pk,
            'slug': self.uuid,
        }))
