from django.urls import include, path
from . import views

app_name = 'web'
urlpatterns = [
    # path('', views.index, name="index"),
    path('unprivileged/', views.unprivileged, name="unprivileged"),
]
