import re
import hashlib
from django.db import transaction
from django.http import HttpResponse
from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from .models import UserImage
from .serializer import UserImageSerializer, UserImageKeywordSerializer

# Create your views here.

class UserImageView(APIView):
    '''
        ユーザー画像
    '''
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request: Request, token, id):
        user = request.user
        image = UserImage.objects.get(user=user, id=id)
        headers = {key: value for key, value in request.headers.items()}

        # トークンチェック
        hash_input = f"{image.id}{user.id}{image.filename}{image.created_at}".encode('utf-8')
        expected_token = hashlib.sha256(hash_input).hexdigest()
        if expected_token != token:
            raise Response(status=status.HTTP_404_NOT_FOUND)
        
        with image.path.open('rb') as file:
            image_data = file.read()
        
        return HttpResponse(image_data, content_type=image.content_type)
    
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
    
class SaveImageView(APIView):
    '''
        画像保存
    '''
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserImageKeywordSerializer

    @transaction.atomic
    def post(self, request: Request, format=None):
        serializer = UserImageSerializer(data=request.data)
        if serializer.is_valid():
            image = serializer.save(user=request.user)

            keywords = request.data.get('keyword', '')
            keywords = re.split(r'[ 　]+', keywords.strip()) 
            for keyword in keywords:
                keyword_serializer = UserImageKeywordSerializer(data={'origin_link': request.data.get('origin_link'), 'keyword': keyword})
                if keyword_serializer.is_valid():
                    keyword_serializer.save(image=image)
                else:
                    return Response(keyword_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteImageView(APIView):
    '''
        画像削除
    '''
    permission_classes = [permissions.IsAuthenticated]
    queryset = UserImage.objects.all()
    serializer_class = UserImageKeywordSerializer

    @transaction.atomic
    def post(self, request: Request, format=None):
        serializer = UserImageSerializer(data=request.data)
        if serializer.is_valid():
            image = serializer.save(user=request.user)

            keywords = request.data.get('keyword', '')
            keywords = re.split(r'[ 　]+', keywords.strip()) 
            for keyword in keywords:
                keyword_serializer = UserImageKeywordSerializer(data={'origin_link': request.data.get('origin_link'), 'keyword': keyword})
                if keyword_serializer.is_valid():
                    keyword_serializer.save(image=image)
                else:
                    return Response(keyword_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
