from django.urls import path, include
from rest_framework import routers
from v1.account.views import AccountAPIView, RegisterView, UserViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('info/', AccountAPIView.as_view(), name='ingo'),                                   # アカウント情報を取得
    path('register/', RegisterView.as_view(), name='register'),                             # アカウント登録処理
    path('',include(router.urls)),                                                          # REST API画面
]