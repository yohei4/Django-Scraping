from django.urls import path, include
from rest_framework import routers
from v1.account.views import AccountAPIView, RegisterView, ListUserViewSet

router = routers.DefaultRouter()
router.register('users', ListUserViewSet)

urlpatterns = [
    path('',include(router.urls)),                                                  # REST API画面
    path('account-api/', AccountAPIView.as_view(), name='account-api'),             # アカウント情報を取得
    path('register/', RegisterView.as_view(), name='register'),                     # アカウント登録処理
]