from django.urls import include, path
from .views import *

app_name = 'dashapp'
urlpatterns = [
    path('', DashApps_Menu_v1.as_view(), name='index'),
    path('<str:name>/', DashApp_Run_v1.as_view(), name='dashapp-run-v1'),
    path('<str:name>/<path:rest_of_path>', DashApp_Run_v1.as_view(), name='dashapp-run-path-v1'),
]
