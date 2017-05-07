from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_save, post_init, post_delete
from django.dispatch import receiver

from feed.models import Event
from friendship.models import Friendship, Subscription


@receiver(post_init, sender=Friendship)
def pre_save_approve_create_friendship(instance, *args, **kwargs):
    instance.status_was = instance.status


@receiver(post_save, sender=Friendship)
def post_save_approve_create_friendship(instance, created=False, *args, **kwargs):
    if not instance.status_was and instance.status:
        Subscription.objects.create(author=instance.sender, target=instance.receiver)
        Subscription.objects.create(author=instance.receiver, target=instance.sender)
        Event.objects.create(content_type=ContentType.objects.get_for_model(instance),
                             object_id=instance.id,
                             author=instance.get_author(),
                             title=instance.get_description()
                             )
        Event.objects.create(content_type=ContentType.objects.get_for_model(instance),
                             object_id=instance.id,
                             author=instance.receiver,
                             title=instance.get_description()
                             )


@receiver(post_delete, sender=Friendship)
def post_delete_friend(instance, *args, **kwargs):
    Subscription.objects.get(author=instance.sender, target=instance.receiver).delete()
    Subscription.objects.get(author=instance.receiver, target=instance.sender).delete()
