from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.response import Response
from dashboard.models import *
from dashboard.exceptions import *
from .serializers import *

from django.utils.safestring import mark_safe

# Create your views here.

class Integration_v1_Badges(GenericAPIView):
    '''
    Load a Badge WebApp
    '''
    permission_classes = (IsAuthenticatedOrReadOnly,)
    renderer_classes = (TemplateHTMLRenderer,)
    serializer_class = Integration_Badge_Serializer
    def get(self, request, format=None, **kwargs):
        app_path = self.kwargs.get('app_path', 'default')
        try:
            app = PathCode.objects.get(path=app_path)
        except (PathCode.DoesNotExist, PathCode.MultipleObjectsReturned):
            raise MyAPIException(code=status.HTTP_400_BAD_REQUEST, detail='Integration ')
        return Response({'code': mark_safe(app.code) }, status=200, template_name='integration/badges.html')
