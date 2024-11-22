from django.urls import path, include
from rest_framework import routers
from .views import UserImageView, UserImagesViewSet, SaveImageView

router = routers.DefaultRouter()
router.register('user-images', UserImagesViewSet, basename='user_images')

urlpatterns = [
    path('serve-image/<token>/<id>', UserImageView.as_view(), name='serve_image'),
    path('save-image/', SaveImageView.as_view(), name='save_image'),
    path('', include(router.urls)),
]