from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.renderers import JSONRenderer

from dashboard_tools.exceptions import MyAPIException
from .models import *
from .serializers import *

class DatabaseFile_v1(GenericAPIView):
    '''
    Retrieve tasks of a specific badge.
    '''
    permission_classes = (IsAuthenticatedOrReadOnly,)
    renderer_classes = (JSONRenderer,)
    serializer_class = DatabaseFile_Serializer

    def get(self, request, *args, **kwargs):
        file_id = kwargs.get('file_id')
        if not file_id:
            raise MyAPIException(code=status.HTTP_400_BAD_REQUEST, detail='File ID is required')

        try:
            file = DatabaseFile.objects.get(pk=file_id)
        except DatabaseFile.DoesNotExist:
            raise MyAPIException(code=status.HTTP_404_NOT_FOUND, detail='File not found')

        response = HttpResponse(file.file_data, content_type=file.content_type)
        response['Content-Disposition'] = 'inline; filename="%s"' % file.file_name

        return response
