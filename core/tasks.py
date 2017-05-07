from celery import task

from core.models import User
from .utils import send_mail


@task(bind=True)
def send_activation_email(self, user_id):
    print(user_id, User.objects.filter(pk=user_id), User.objects.all())
    # try:
    user = User.objects.get(id=user_id)
    # except Exception as exc:
    #     raise self.retry(exc=exc, countdown=1)

    try:
        send_mail(
            'confirmation', 'new@mysite.com', [user.email, ],
            context={'user': user},
        )
    except Exception as exc:
        raise self.retry(exc=exc, countdown=60, max_retries=10)
