from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, AccountValidation
from .tasks import send_activation_email


@receiver(post_save, sender=User)
def post_save_user_confirmation(instance, created, *args, **kwargs):
    if created and instance.email:
        if not instance.social_auth.exists():
            AccountValidation.objects.create(user=instance)
            send_activation_email.apply_async([instance.id, ])
        else:
            instance.confirmed = True
            instance.save()
