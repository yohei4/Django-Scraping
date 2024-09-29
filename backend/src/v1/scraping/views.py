from django.db import transaction
from rest_framework.views import APIView
from rest_framework import viewsets, status, permissions
from rest_framework.request import Request
from rest_framework.response import Response
from .serializer import ScrapingSerializer, ScrapingHistorySerializer
from .models import ScrapingHistory
from .services import scraping_images

# Create your views here.

class ScrapingView(APIView):
    '''
        スクレイピング実行
    '''
    permission_classes = [permissions.IsAuthenticated]
    queryset = ScrapingHistory.objects.all()
    serializer_class = ScrapingSerializer

    @transaction.atomic
    def post(self, request: Request, format=None):
        serializer = ScrapingSerializer(data=request.data)
        link = scraping_images('羽咲みはる')
        
        return Response(link, status=status.HTTP_200_OK)