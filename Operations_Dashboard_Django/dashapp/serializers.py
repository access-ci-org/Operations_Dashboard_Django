from django.utils.safestring import mark_safe
from rest_framework import serializers
from .models import *

class AppCode_Run_v1_Serializer(serializers.ModelSerializer):
    '''
    Returns App Code Execution Information
    '''
    safe_code =  serializers.SerializerMethodField()
    class Meta:
        model = AppCode
        fields = ('name', 'safe_code')
    def get_safe_code(self, object):
        return make_safe(object.code)

class DashApp_Run_v1_Serializer(serializers.ModelSerializer):
    '''
    Returns Dashboard Application Execution Information
    '''
    class Meta:
        model = DashApp
        fields = ('app_id', 'name', 'path', 'template', 'description')

class DashApp_All_Serializer(serializers.ModelSerializer):
    '''
    Returns Dashboard Application Execution Information
    '''
    class Meta:
        model = DashApp
        fields = '__all__'
