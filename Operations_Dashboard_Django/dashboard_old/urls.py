from django.urls import include, path, re_path
from dashboard import views

app_name = 'dashboard'
urlpatterns = [
    path('', views.index, name="index"),
    path('edit_sorry/', views.edit_sorry, name="edit_sorry"),
    path('login/', views.login, name="login"),
    path('clear_and_logout/', views.clear_and_logout, name='clear_and_logout'),
    path('unprivileged/', views.unprivileged, name="unprivileged"),
]
