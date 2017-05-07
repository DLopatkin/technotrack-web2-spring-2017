import datetime

from django.conf import settings
from django.shortcuts import render, get_object_or_404
from django.utils import timezone
# Create your views here.
from django.views.generic import DetailView

from core.models import User, AccountValidation


class UserProfileView(DetailView):
    template_name = 'profile.html'
    model = User

    def get_object(self, queryset=None):
        return get_object_or_404(User, pk=self.request.user.pk)

    def get_context_data(self, **kwargs):
        context = super(UserProfileView, self).get_context_data(**kwargs)
        return context


def home(request):
    return render(request, template_name='vkhome.html')


def index(request):
    return render(request, 'index.html')


class AccountValidationView(DetailView):
    model = AccountValidation
    template_name = 'confirmation.html'
    context_object_name = 'validator'
    slug_url_kwarg = 'slug'
    slug_field = 'uuid'
    query_pk_and_slug = True

    def get_context_data(self, **kwargs):
        context = super(AccountValidationView, self).get_context_data(**kwargs)
        obj = context.get('object')
        if obj and not obj.confirmed:
            if (timezone.now() - obj.created) < datetime.timedelta(settings.ACCOUNT_ACTIVATION_DAYS):
                context['expired'] = False
                context['validator'].confirm()
            else:
                context['expired'] = True
                context['validator'].update_uuid()
        else:
            context['validator'] = None
        return context
