from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="Home"),
    path("<path:rest_of_path>", views.index, name="Home"),
]
