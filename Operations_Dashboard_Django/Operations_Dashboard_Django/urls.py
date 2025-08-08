"""Operations_Dashboard_Django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings as django_settings
from django.contrib import admin
from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import include, path
from django.views.generic import RedirectView
from allauth.socialaccount.providers.oauth2.views import OAuth2LoginView
from . import views
from access_django_user_admin import views

urlpatterns = [
    path('accounts/', include('allauth.urls')),
    path('admin/', admin.site.urls),
    path('dashboard/', include('dashboard.urls', namespace='dashboard')),
    path('access_django_user_admin/', include('access_django_user_admin.urls', namespace="access_django_user_admin")),
    path('dashapp/', include('dashapp.urls', namespace='dashapp')),
    path('dbfile/', include('dbfile.urls', namespace='dbfile')),
    path('IntegrationBadgesUI/', include('IntegrationBadgesUI.urls')),
    path('badgetoken/', include('badgetoken.urls') ),
    path('favicon.ico', views.favicon),
    path('', RedirectView.as_view(url='/dashboard') ),
#    path('', RedirectView.as_view(url=django_settings.LOGIN_URL) )
#    path('', RedirectView.as_view(url='IntegrationBadgesUI') ),
    path('login/', RedirectView.as_view(url='/accounts/cilogon/login') )
]
