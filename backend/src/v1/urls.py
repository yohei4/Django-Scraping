from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('account/',include('v1.account.urls')),                                # アカウント関係
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),    # トークン生成
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),   # トークン再発行
]