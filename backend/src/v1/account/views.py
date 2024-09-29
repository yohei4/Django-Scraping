import jwt
from django.db import transaction
from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializer import UserSerializer, RegisterSerializer

# Create your views here.

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    '''
        ユーザー情報一覧
    '''
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class AccountAPIView(APIView):
    '''
        ユーザー情報取得
    '''
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    
    def get(self, request, format=None):
        user = request.user
        return Response(UserSerializer(user).data, status=status.HTTP_200_OK)

class RegisterView(APIView):
    '''
        ユーザー登録
    '''
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    @transaction.atomic
    def post(self, request: Request, format=None):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
