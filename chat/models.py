from django.db import models

from core.models import Titled, Authored, Dated, User


class Chat(Titled, Authored, Dated):
    id = models.PositiveIntegerField(primary_key=True, auto_created=True)


class UserChat(models.Model):
    user = models.ForeignKey(User)
    chat = models.ForeignKey(Chat)


class Message(Authored, Dated):
    content = models.TextField(max_length=1024)
    chat = models.ForeignKey(Chat)
