from django.shortcuts import render, redirect
from django.forms.formsets import formset_factory
from django.forms import modelformset_factory
from django import http
from django.urls import reverse, reverse_lazy
from django.template.loader import get_template
from django.template import Context
from django.utils import timezone

from datetime import datetime, timedelta, time
from zoneinfo import ZoneInfo

from django.contrib.auth.decorators import login_required, user_passes_test
from django.conf import settings

import dashboard_tools.signals

import json
import logging
logger = logging.getLogger(__name__)
import re

def editors_check(user):
    return user.groups.filter(name='editors').exists()

def viewers_check(user):
    return user.groups.filter(name='editors').exists() or user.groups.filter(name='viewers').exists()

def unprivileged(request):
    return render(request, 'web/unprivileged.html')

def is_privileged(request):
    return True if request.user.username == 'navarro' else False

#@login_required
#@user_passes_test(viewers_check, login_url=reverse_lazy('web:unprivileged'))
def index(request):
    """
    Main dashboard
    """
    return render(request, 'dashboard_index_orig.html')

@login_required
def login(request):
    remote_ip = request.META.get('HTTP_X_FORWARDED_FOR')
    if not remote_ip:
        remote_ip = request.META.get('REMOTE_ADDR')
    msg = 'login from {}'.format(remote_ip)
#   Standard logging handled in signals.py
#    logger.info('{} {}'.format(request.user.username, msg))
#    make_log_entry(request.user.username, msg)
    return redirect(reverse('dashboard:index'))