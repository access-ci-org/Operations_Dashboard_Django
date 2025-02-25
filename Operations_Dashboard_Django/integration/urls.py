from django.urls import include, path, re_path
from integration import views

app_name = 'integration'
urlpatterns = [
    path('app/', views.Integration_v1_Badges.as_view(), name='integration-app-v1'),
    path('app/<str:app_path>/', views.Integration_v1_Badges.as_view(), name='integration-app-v1'),
]
