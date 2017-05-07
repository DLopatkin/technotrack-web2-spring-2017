from django.conf.urls import url
from .views import home, UserProfileView, AccountValidationView

urlpatterns = [
    url(r'^login/$', home, name='home'),
    url(r'^profile/$', UserProfileView.as_view(), name='profile'),
    url(r'^confirmation/(?P<pk>\d+)/(?P<slug>[-\w]+)/$', AccountValidationView.as_view(), name='confirmation')

]