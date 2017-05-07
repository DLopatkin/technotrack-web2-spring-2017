from django.db.models.signals import post_save

from chat.models import UserChat, Chat


def create_chat(instance, *args, **kwargs):
    UserChat.objects.create(user=instance.get_author(),
                            chat=instance
                            )


post_save.connect(create_chat, sender=Chat)
