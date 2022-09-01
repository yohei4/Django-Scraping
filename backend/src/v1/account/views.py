import jwt
from django.db import transaction
from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from .serializer import UserSerializer, RegisterSerializer

# Create your views here.

class ListUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# class LoginView(jwt_views.TokenObtainPairView):
#     '''
#         ユーザーログイン
#     '''
#     serializer_class = LoginSerializer

class AccountAPIView(APIView):

    @classmethod
    def _get_user(self, JWT):
        res = {
            'message': str,
            'data': object,
            'code': 0
        }
        try:
            payload = jwt.decode(jwt=JWT, key=self.settings.SECRET_KEY, algorithms=["HS256"])

            res['data'] = User.objects.get(id=payload["user_id"])
            res['code'] = 1
        except jwt.ExpiredSignatureError:
        # access tokenの期限切れ
            res['message'] = "Activations link expired"
        except jwt.exceptions.DecodeError:
            res['message'] = "Invalid Token"
        except User.DoesNotExist:
            res['message'] = "user does not exists"

        return res

    def get(self, request, format=None):
        JWT = request.COOKIES.get("user_token")
        if not JWT:
            return Response({"error": "No token"}, status=status.HTTP_400_BAD_REQUEST)
        account = self._get_account(JWT)

        if account['code'] == 0:
            return Response(account, status=status.HTTP_400_BAD_REQUEST)

        if account['data'].is_active:
            serializer = UserSerializer(account['data'])
            return Response(serializer.data)
        return Response(account, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
    '''
        ユーザー登録
    '''
    permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    @transaction.atomic
    def post(self, request, format=None):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
