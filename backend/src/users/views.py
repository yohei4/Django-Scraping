from django.shortcuts import render
from rest_framework import viewsets
from .models import User
from .serializer import UserSerializer

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    # モデルのオブジェクトを取得
    queryset = User.objects.all()
    # シリアライザーを取得
    serializer_class = UserSerializer
