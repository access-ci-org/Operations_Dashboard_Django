"""
Django settings for Operations_Dashboard_Django project.

Originally generated by 'django-admin startproject' using Django 4.1.1.
> upgraded to Django 5.0.x October 2024 - jlambertson

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

##### ACCESS-CI CUSTOMIZATIONS #####
import json
import os
import sys

if 'APP_CONFIG' not in os.environ:
    print('Missing APP_CONFIG environment variable')
    sys.exit(1)
try:
    with open(os.environ['APP_CONFIG'], 'r') as file:
        conf=file.read()
    CONF = json.loads(conf)
except (ValueError, IOError) as e:
    print('Failed to load APP_CONFIG={}'.format(os.environ['APP_CONFIG']))
    raise
#####

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = CONF['DJANGO_SECRET_KEY']

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = CONF['DEBUG']

ALLOWED_HOSTS = CONF['ALLOWED_HOSTS']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.messages',
    'django.contrib.sessions',
    'django.contrib.staticfiles',
    'dashboard',
    # For django-allauth
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.cilogon',
    'django_bootstrap5',
    #'bootstrap5',
    # 'django_extensions',
]

SITE_ID = 1

# SOCIALACCOUNT_PROVIDERS = {
#    'cilogon': {
#        # For each OAuth based provider, either add a ``SocialApp``
#        # (``socialaccount`` app) containing the required client
#        # credentials, or lis  t them here:
#        'APP': {
#            'client_id': CONF['SOCIAL_CLIENT_ID'],
#            'secret': CONF['SOCIAL_SECRET'],
#            'key': ''
#        }
#    }
# }

ACCOUNT_EMAIL_VERIFICATION = 'none'
ACCOUNT_LOGOUT_REDIRECT_URL = '/accounts/cilogon/login/'
LOGIN_URL = '/accounts/cilogon/login/'
LOGIN_REDIRECT_URL = '/dashboard/login'
#SOCIALACCOUNT_ADAPTER = 'dashboard.views.MySocialAccountAdapter'
#SOCIALACCOUNT_STORE_TOKENS = True

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'allauth.account.middleware.AccountMiddleware',
]

AUTHENTICATION_BACKENDS = [
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
]

CSRF_TRUSTED_ORIGINS = ["https://localhost", "https://localhost:8443", "https://*.access-ci.org"]
USE_X_FORWARDED_HOST = True
USE_X_FORWARDED_PORT = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
#SECURE_SSL_REDIRECT = True

# Switched to True on 09-03-2020 by JP, making whitelist no longer relevant
#CORS_ORIGIN_ALLOW_ALL = True
#CORS_ORIGIN_WHITELIST = (
#    'https://access-ci.org',
#    'https://allocations.access-ci.org',
#    'https://support.access-ci.org',
#    'https://operations.access-ci.org',
#    'https://metrics.access-ci.org',
#)
#CORS_ALLOW_METHODS = (
#    'GET'
#)

ROOT_URLCONF = 'Operations_Dashboard_Django.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [ os.path.normpath(os.path.join(os.path.dirname(__file__), '../templates'))],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.contrib.messages.context_processors.messages',
                'django.contrib.auth.context_processors.auth',
                'django.template'
                '.context_processors.request',
#                'django.template.context_processors.debug',
            ],
        },
    },
]

WSGI_APPLICATION = 'Operations_Dashboard_Django.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'USER': CONF['DJANGO_USER'],
        'PASSWORD': CONF['DJANGO_PASS'],
        'HOST': os.environ.get('PGHOST', CONF.get('DB_HOSTNAME_WRITE', 'localhost')),
    },
    'default.read': {
        'USER': CONF['DJANGO_USER'],
        'PASSWORD': CONF['DJANGO_PASS'],
        'HOST': os.environ.get('PGHOST', CONF.get('DB_HOSTNAME_READ', 'localhost')),
    }
}
for db in DATABASES:
    DATABASES[db]['NAME'] = CONF['DB_DATABASE']
    DATABASES[db]['ENGINE'] = 'django.db.backends.postgresql'
    DATABASES[db]['PORT'] = os.environ.get('PGPORT', CONF.get('DB_PORT', '5432'))
    DATABASES[db]['CONN_MAX_AGE'] = 600 # Persist DB connections
    DATABASES[db]['OPTIONS'] = {'options': '-c search_path=dashboard,public'}

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_ROOT = CONF['STATIC_ROOT']
STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Logging setup
import logging
from logging.handlers import SysLogHandler

if DEBUG or not os.path.exists('/dev/log'):
    DEFAULT_LOG = 'console'
else:
    DEFAULT_LOG = 'syslog'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'simple': {
            'format': '[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s'
        }
    },
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': CONF['APP_LOG'],
            'formatter': 'simple'
        }
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'WARNING'
        },
        'django.server': {
            'handlers': ['file'],
#            'propagate': True,
            'level': 'DEBUG'
        },
        'dashboard': {
            'handlers': ['file'],
            'level': 'DEBUG'
        }
    }
}

APP_NAME = 'Dashboard'
APP_VERSION = CONF['APP_VERSION']
