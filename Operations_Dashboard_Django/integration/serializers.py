from rest_framework import serializers
from dashboard.models import *

class Integration_Badge_Serializer(serializers.ModelSerializer):
    class Meta:
        model = PathCode
        fields = '__all__'
