from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_save, pre_delete

from feed.models import Event, Eventable


def create_event(instance, *args, **kwargs):
    if not instance.event.exists():
        Event.objects.create(content_type=ContentType.objects.get_for_model(instance),
                             object_id=instance.id,
                             author=instance.get_author(),
                             title=instance.get_description()
                             )


def delete_event(instance, *args, **kwargs):
    instance.event.remove()


for model in Eventable.__subclasses__():
    post_save.connect(create_event, sender=model)
    pre_delete.connect(delete_event, sender=model)