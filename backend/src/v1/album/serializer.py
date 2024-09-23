from rest_framework import serializers
from .models import UserImage

class UserImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserImage
        fields = ('id', 'user_id', 'path', 'filename', 'origin_link', 'created_at', 'updated_at')
        extra_kwargs = {
            'id': {'write_only': True},
            # 'user_id': {'write_only': True},
            'created_at': {'write_only': True},
            'updated_at': {'write_only': True},
        }
