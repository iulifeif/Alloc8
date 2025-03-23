from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['first_name', 'last_name', 'email', 'role', 'skills', 'goals']
        extra_kwargs = {
            'password': {'write_only': True}
        }
