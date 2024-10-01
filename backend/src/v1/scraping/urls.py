from django.urls import path, include
from rest_framework import routers
from .views import ScrapingView, ScrapingHistoryViewSet

router = routers.DefaultRouter()
router.register("scraping-history", ScrapingHistoryViewSet, basename="scraping-history")

urlpatterns = [
    path("", include(router.urls)),
    path("", ScrapingView.as_view(), name="scraping"),
]