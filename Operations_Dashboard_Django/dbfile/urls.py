from django.urls import path

from .views import *

app_name = 'dbfile'
urlpatterns = [
     path(r'files/<str:file_id>/', DatabaseFile_v1.as_view(), name='dbfile-id-v1'),
]
