from django.urls import include, path
from .views import *

app_name = 'dashapp'
urlpatterns = [
    path('apps/', DashApps_List_v1.as_view(), name='dashapps-v1'),
    path('app/<str:name>/', DashApp_Run_v1.as_view(), name='dashapp-run-v1'),
    path('app/<str:name>/<path:rest_of_path>', DashApp_Run_v1.as_view(), name='dashapp-run-path-v1'),
]
