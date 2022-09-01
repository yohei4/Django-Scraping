from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, PasswordField

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'created_at', 'updated_at')

    def create(self, validated_data):
        return User.objects.create_user(validated_data)

class LoginSerializer(TokenObtainPairSerializer):
    pass
    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)

    #     self.fields["email"] = serializers.EmailField()
    #     self.fields["password"] = PasswordField()

    # def validate(self, attrs):
    #     data = super().validate(attrs)

    #     if api_settings.UPDATE_LAST_LOGIN:
    #         update_last_login(None, self.user)

    #     return data

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields["email"] = serializers.EmailField()
        self.fields["password"] = PasswordField()

    def create(self, validated_data):
        return User.objects.create_user(validated_data) 
    
    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('Password must be at least 8 characters.')
        return value