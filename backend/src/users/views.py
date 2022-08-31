from django.shortcuts import render
from rest_framework import viewsets
from .models import User
from .serializer import UserSerializer
from rest_framework import authentication, permissions, generics


# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# class Login(generics):
#     pass
