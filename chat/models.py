from django.db import models

from core.models import Titled, Authored, Dated, User


class Chat(Titled, Authored, Dated):
    id = models.PositiveIntegerField(primary_key=True, auto_created=True)

    def __str__(self):
        return '[{}] {}'.format(self.pk, self.title)

    def get_author(self):
        return self.author


class UserChat(models.Model):
    user = models.ForeignKey(User)
    chat = models.ForeignKey(Chat)

    def __str__(self):
        return '{} in {}'.format(self.user.username, self.chat.title)


class Message(Authored, Dated):
    content = models.TextField(max_length=1024)
    chat = models.ForeignKey(Chat)

    def __str__(self):
        return '{} in {}: {}'.format(self.author.username, self.chat.title, self.content[:10])