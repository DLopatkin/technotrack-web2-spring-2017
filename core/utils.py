from templated_email import get_templated_mail
from django.conf import settings


def send_mail(template, from_mail, recipient_list, context):

    if settings.DEBUG:
        recipient_list = [admin[0] for admin in settings.ADMINS]

    email = get_templated_mail(
        template,
        context,
        from_mail,
        recipient_list
    )
    email.send()