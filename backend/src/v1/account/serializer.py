from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, PasswordField

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active', 'is_admin', 'created_at', 'updated_at']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['username'] = serializers.CharField(required=True, max_length=150)
        self.fields['email'] = serializers.EmailField(required=True, max_length=255)
        self.fields['password'] = serializers.CharField(required=True, write_only=True, max_length=128, min_length=8)

    def create(self, validated_data: dict[str, any]):
        return User.objects.create_user(validated_data)
    
    def validate_email(self, value):
        '''
            メールアドレスのバリデーション
        '''
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('このメールアドレスは既に使用されています。')
        return value