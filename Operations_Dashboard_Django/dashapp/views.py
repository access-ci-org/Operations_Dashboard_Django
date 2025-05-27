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

class DashApps_List_v1(GenericAPIView):
    '''
    Load a Dashboard WebApp
    '''
    permission_classes = (IsAuthenticatedOrReadOnly,)
    renderer_classes = (JSONRenderer, TemplateHTMLRenderer,)
    serializer_class = DashApp_All_Serializer
    def get(self, request, format=None, **kwargs):
        mypath = request.path.removesuffix('/')
        try:
            myapp = DashApp.objects.get(path=mypath)
        except (DashApp.DoesNotExist):
            raise MyAPIException(code=status.HTTP_400_BAD_REQUEST, detail=f'Dashboard application "{basepath}" does not exist')

        try:
            apps = DashApp.objects.filter(disabled=False).exclude(path=mypath)
        except Exception as exc:
            raise MyAPIException(code=status.HTTP_400_BAD_REQUEST, detail=f'Error retrieving Dashboard Apps')
        data = {'apps': self.serializer_class(apps, many=True).data }
        data['code'] = {}
        for i in DashAppCode.objects.filter(dashapp=myapp.app_id):
            data['code'][i.appcode.name] = mark_safe(i.appcode.code.\
                replace('%APP_BASENAME%', myapp.path).\
                replace('%OPERATIONS_API_BASE_URL%', settings.OPERATIONS_API_BASE_URL) )
        if request.accepted_renderer.format == 'json':
            return MyAPIResponse(data)
        return Response(data, status=200, template_name='dashapp/badges.html')

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
            app = DashApp.objects.get(path=basepath)
        except (DashApp.DoesNotExist):
            raise MyAPIException(code=status.HTTP_400_BAD_REQUEST, detail=f'Dashboard application "{basepath}" does not exist')
        if app.disabled:
            raise MyAPIException(code=status.HTTP_400_BAD_REQUEST, detail=f'Dashboard application "{basepath}" is disabled')
        data = self.serializer_class(app).data
        data['code'] = {}
        for i in DashAppCode.objects.filter(dashapp=app.app_id):
            data['code'][i.appcode.name] = mark_safe(i.appcode.code.\
                replace('%APP_BASENAME%', app.path).\
                replace('%OPERATIONS_API_BASE_URL%', settings.OPERATIONS_API_BASE_URL) )
        return Response(data, status=200, template_name=app.template)
