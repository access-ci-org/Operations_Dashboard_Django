from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.authentication import SessionAuthentication
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.generics import GenericAPIView
from django.db import transaction
from django.utils import timezone
from django.http import HttpResponse,HttpResponseServerError,HttpResponseForbidden,JsonResponse
from django.db.models import Q

import allauth
from allauth.models import *
from allauth.socialaccount.models import SocialAccount,SocialToken,SocialApp
#from allauth.socialaccount import *
#from allauth.serializers import *

import datetime

from requests_oauth2client import OAuth2Client, ClientSecretBasic, OAuth2AccessTokenAuth, requests
from django.conf import settings


import logging

log = logging.getLogger(__name__)

def get_cilogon_auth_client(app_id):
    social_app = SocialApp.objects.get(id=app_id)
    #print(f"CLIENT_ID {social_app.client_id}  CLIENT_SECRET {social_app.secret}")
    return OAuth2Client.from_discovery_endpoint(
        "https://cilogon.org/.well-known/openid-configuration",
        auth=ClientSecretBasic(social_app.client_id, social_app.secret),
    )

def get_updated_token(social_token):
    # check to see if token is within 1 minutes of expiring
    # If it is, refresh the token
    timeplus1 = datetime.datetime.now(datetime.timezone.utc)+datetime.timedelta(minutes=1)
    if not timeplus1<social_token.expires_at:
        #token is expired, we must refresh it
        try:
            client = get_cilogon_auth_client(social_token.app_id)
            newtoken = client.refresh_token(social_token.token_secret, scope="openid email profile org.cilogon.userinfo offline_access")
            #print(f"refreshed token: {newtoken.access_token}")
            #newtoken_details = client.introspect_token(newtoken)
        except Exception as e:
            print(f"CILogon exception: {e}")
        #defaults = {
        #    'token': newtoken.access_token,
        #    'token_secret': newtoken.refresh_token,
        #    'expires_at': newtoken.expires_at,
        #}
        if not newtoken:
            #token must not have been able to be refreshed
            return HttpResponseForbidden("Token could not be renewed; login again")
        else:
            social_token.token = newtoken.access_token
            social_token.token_secret = newtoken.refresh_token
            social_token.expires_at = newtoken.expires_at
            social_token.save()

    token_dict = {'token': social_token.token, 'refresh_token': social_token.token_secret, 'expires_at': social_token.expires_at}
    return token_dict

class Badge_Token_v1(GenericAPIView):
    '''
        An ACCESS Generic Resource Detail
    '''
    permission_classes = (IsAuthenticated,)
    authentication_classes = [SessionAuthentication]
    renderer_classes = (JSONRenderer,)

    def get(self, request, format=None, **kwargs):
        try:
            user_id = request.user.id
            social_account = SocialAccount.objects.get(user_id=user_id)
            #print(f"User ID: {user_id}, social account: {social_account.id}")
            social_token = SocialToken.objects.get(account=social_account.id)
            #print(f"social token dict: {social_token.__dict__}")
            token_dict = get_updated_token(social_token)
        except Exception as e:
            return HttpResponseServerError(str(e))
        return JsonResponse(token_dict)

