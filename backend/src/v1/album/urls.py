from django.urls import path, include
from rest_framework import routers
from .views import UserImageView, UserImagesViewSet, SaveImageView

router = routers.DefaultRouter()
router.register('user-images', UserImagesViewSet, basename='user-images')

urlpatterns = [
    path('', include(router.urls)),
    path('serve-image/<token>/<id>', UserImageView.as_view(), name='serve-image'),
    path('save-image/', SaveImageView.as_view(), name='save-image'),
]