from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from ugc.admin import PostInline
from .models import User, AccountValidation


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        ('User info', {'fields':
                           (
                               'username',
                               'password',
                               'first_name',
                               'last_name',
                               'email',
                               'avatar',
                               'is_staff',
                               'is_superuser',
                               'confirmed',
                           )
        }),
    )
    inlines = PostInline,


@admin.register(AccountValidation)
class AccountValidationAdmin(admin.ModelAdmin):
    readonly_fields = ['uuid', 'created', ]
    fields = ['user', 'confirmed', 'confirmed_date', 'uuid', 'created', ]
    list_display = ('__str__', 'created', 'confirmed_date', 'confirmed', )