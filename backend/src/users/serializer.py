from dataclasses import fields
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_active', 'is_admin', 'created_at', 'updated_at')