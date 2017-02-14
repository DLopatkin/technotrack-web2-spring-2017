from django.db import models

from core.models import Authored, Dated, Titled


class Post(Authored, Dated, Titled):
    description = models.CharField(max_length=1024, blank=False)
    image = models.ImageField(blank=True)
    attachment = models.FileField(upload_to='uploads/%Y/%m/%d/', blank=True)

    LIVE_STATUS = 1
    FINISHED_STATUS = 2
    HIDDEN_STATUS = 3
    STATUS_CHOICES = (
        (LIVE_STATUS, u'Активный'),
        (FINISHED_STATUS, u'Закончен'),
        (HIDDEN_STATUS, u'Скрытый'),
    )
    status = models.IntegerField(choices=STATUS_CHOICES, default=LIVE_STATUS)

    URGENT_TYPE = 1
    DATED_TYPE = 2
    UNDATED_TYPE = 3
    POST_TYPE = (
        (URGENT_TYPE, u'Срочно'),
        (DATED_TYPE, u'Запланированный'),
        (UNDATED_TYPE, u'Бессрочный'),
    )
    type = models.IntegerField(choices=POST_TYPE, default=UNDATED_TYPE)