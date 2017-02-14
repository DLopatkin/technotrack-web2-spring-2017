from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    first_name = models.CharField(u'имя', max_length=25, blank=False)
    last_name = models.CharField(u'фамилия', max_length=25, blank=False)
    email = models.EmailField(u'e-mail', blank=False, unique=True)
    avatar = models.ImageField(u'фото', blank=True, upload_to='avatars')

    class Meta:
        verbose_name = u'пользователь'
        verbose_name_plural = u'пользователи'


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

    class Meta:
        abstract = True