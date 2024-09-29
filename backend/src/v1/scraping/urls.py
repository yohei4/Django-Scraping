from django.urls import path, include
from rest_framework import routers
from .views import ScrapingView

# router = routers.DefaultRouter()
# router.register('', ScrapingView, basename='scraping')

urlpatterns = [
    # path('', include(router.urls)),
    path('', ScrapingView.as_view(), name='scraping'),
]