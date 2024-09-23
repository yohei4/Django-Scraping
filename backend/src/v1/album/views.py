from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from .models import UserImage
from .serializer import UserImageSerializer
from rest_framework.response import Response

# Create your views here.

class UserImagesViewSet(viewsets.ReadOnlyModelViewSet):
    '''
        ユーザー画像一覧
    '''
    permission_classes = [permissions.IsAuthenticated]
    models = UserImage
    serializer_class = UserImageSerializer

    def get_queryset(self):
        user = self.request.user
        return self.models.objects.filter(user=user)
