from django.urls import path, include
from rest_framework import routers
from .views import UserImagesViewSet

router = routers.DefaultRouter()
router.register('user-images', UserImagesViewSet, basename='userimages')

urlpatterns = [
    path('', include(router.urls)),
]