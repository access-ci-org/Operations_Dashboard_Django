from rest_framework import serializers

from .models import *

class DatabaseFile_Serializer(serializers.ModelSerializer):
    '''
    Returns DatabaseFile
    '''

    class Meta:
        model = DatabaseFile
        fields = ('file_id', 'file_name', 'file_data', 'uploaded_at')
