from django.conf import settings
from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.response import Response

from dashboard.exceptions import *
from dashboard.responses  import *
from .serializers import *

# Create your views here.

class DashApps_Menu_v1(GenericAPIView):
    '''
    Load a Dashboard WebApp
    '''
    permission_classes = (IsAuthenticatedOrReadOnly,)
    renderer_classes = (JSONRenderer, TemplateHTMLRenderer,)
    serializer_class = DashApp_All_Serializer
    def get(self, request, format=None, **kwargs):
        thispath = request.path.removesuffix('/')
        try:
            thisapp = DashApp.objects.get(path=thispath)
        except (DashApp.DoesNotExist):
            raise MyAPIException(code=status.HTTP_400_BAD_REQUEST, detail=f'Dashboard application "{thispath}" does not exist')

        try:
            apps = DashApp.objects.filter(path__startswith=f'{thispath}/'). filter(disabled=False).exclude(app_id=thisapp.app_id).order_by('name')
        except Exception as exc:
            raise MyAPIException(code=status.HTTP_400_BAD_REQUEST, detail=f'Error retrieving Dashboard Apps')
        data = {
            'thisapp': self.serializer_class(thisapp).data,
            'apps': self.serializer_class(apps, many=True).data
            }
        data['appcode'] = {}
        appcodes = DashAppCode.objects.filter(dashapp=thisapp.app_id)

        ALIASES = { # Initialize with default aliases
            '%APP_BASENAME%': thisapp.path,
            '%OPERATIONS_API_BASE_URL%': settings.OPERATIONS_API_BASE_URL,
        }
        for ac in appcodes:
            if ac.appcode.alias:
                ALIASES[f'%{ac.appcode.alias}%'] = ac.appcode.code

        for ac in appcodes:
            tmp = str(ac.appcode.code) # A copy
            for _ in range(2): # Two levels only
                for al in ALIASES:
                    tmp = tmp.replace(al, ALIASES[al])
            data['appcode'][ac.appcode.name] = mark_safe(tmp)

        for al in ALIASES:
            data['appcode'][al.strip('%')] = mark_safe(ALIASES[al])

        # for i in DashAppCode.objects.filter(dashapp=thisapp.app_id):
        #     data['appcode'][i.appcode.name] = mark_safe(i.appcode.code.\
        #         replace('%APP_BASENAME%', myapp.path).\
        #         replace('%OPERATIONS_API_BASE_URL%', settings.OPERATIONS_API_BASE_URL) )
        if request.accepted_renderer.format == 'json':
            return MyAPIResponse(data)

        return Response(data, status=200, template_name=thisapp.template)

class DashApp_Run_v1(GenericAPIView):
    '''
    Load a Dashboard WebApp
    '''
    permission_classes = (IsAuthenticatedOrReadOnly,)
    renderer_classes = (TemplateHTMLRenderer,)
    serializer_class = DashApp_Run_v1_Serializer
    def get(self, request, format=None, **kwargs):
        name = self.kwargs.get('name')
        rest = self.kwargs.get('rest_of_path', '')
        basepath = request.path.removesuffix(f'/{rest}')
        try:
            thisapp = DashApp.objects.get(path=basepath)
        except (DashApp.DoesNotExist):
            raise MyAPIException(code=status.HTTP_400_BAD_REQUEST, detail=f'Dashboard thisapplication "{basepath}" does not exist')
        if thisapp.disabled:
            raise MyAPIException(code=status.HTTP_400_BAD_REQUEST, detail=f'Dashboard application "{basepath}" is disabled')
        data = self.serializer_class(thisapp).data
        data['appcode'] = {}
        appcodes = DashAppCode.objects.filter(dashapp=thisapp.app_id)

        # Aliases are pre-applied to appcode fragmens and passed along with them to the template engine
        ALIASES = { # Initialize with default aliases
            '%APP_BASENAME%': thisapp.path,
            '%OPERATIONS_API_BASE_URL%': settings.OPERATIONS_API_BASE_URL,
        }
        for ac in appcodes:
            if ac.appcode.alias:
                ALIASES[f'%{ac.appcode.alias}%'] = ac.appcode.code

        for ac in appcodes:
            tmp = str(ac.appcode.code) # A copy
            for _ in range(2): # Two levels only
                for al in ALIASES:
                    tmp = tmp.replace(al, ALIASES[al])
            data['appcode'][ac.appcode.name] = mark_safe(tmp)

        for al in ALIASES:
            data['appcode'][al.strip('%')] = mark_safe(ALIASES[al])

        return Response(data, status=200, template_name=thisapp.template)
