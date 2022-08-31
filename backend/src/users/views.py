from django.shortcuts import render
from rest_framework import viewsets
from .models import User
from .serializer import LoginSerializer, UserSerializer
from rest_framework_simplejwt import views as jwt_views


# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginView(jwt_views.TokenObtainPairView):
    serializer_class = LoginSerializer