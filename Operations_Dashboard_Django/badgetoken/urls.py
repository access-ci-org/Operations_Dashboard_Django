from django.urls import path, re_path, register_converter

from badgetoken.views import *

# Define our custom URLs
# Additionally, we include login URLs for the browseable API.
urlpatterns = [
     path(r'v1/token/',
          Badge_Token_v1.as_view(),
          name='Badge-Token-v1'),

]
