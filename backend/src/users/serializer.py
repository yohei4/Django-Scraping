from dataclasses import fields
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'created_at', 'updated_at')

    def create(self, validated_data):
        return User.objects.create_user(validated_data)