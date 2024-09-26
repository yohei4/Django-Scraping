from django.shortcuts import render
from django.db import transaction
from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserImage
from .serializer import UserImageSerializer, UserImageKeywordSerializer

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
    
class SaveImageViewSet(APIView):
    '''
        ユーザー画像一覧
    '''
    permission_classes = [permissions.IsAuthenticated]
    models = UserImage
    serializer_classes = (UserImageSerializer, UserImageKeywordSerializer)

    @transaction.atomic
    def post(self, request, format=None):
        serializer = UserImageSerializer(data=request.data)
        if serializer.is_valid():
            image = serializer.save(user=request.user)
            return Response(status=status.HTTP_201_CREATED)
