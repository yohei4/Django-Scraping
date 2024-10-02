from django.db import transaction
from django.db.models import F
from rest_framework.views import APIView
from rest_framework import viewsets, status, permissions
from rest_framework.request import Request
from rest_framework.response import Response
from .serializer import ScrapingSerializer, ScrapingHistorySerializer
from .models import ScrapingHistory
from .services import ScarpingImage

# Create your views here.

class ScrapingView(APIView):
    """
        スクレイピング実行
    """
    permission_classes = [permissions.IsAuthenticated]
    queryset = ScrapingHistory.objects.all()
    serializer_class = ScrapingSerializer

    @transaction.atomic
    def post(self, request: Request, format=None):
        serializer = ScrapingSerializer(data=request.data)
        scraper = ScarpingImage(safe=False)
        result, images = scraper.exec(request.data.get("keyword"), 1)
        
        return Response(images, status=status.HTTP_200_OK)
    
class ScrapingHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    '''
        スクレイピング履歴一覧
    '''
    permission_classes = [permissions.IsAuthenticated]
    models = ScrapingHistory
    serializer_class = ScrapingHistorySerializer

    def get_queryset(self):
        user = self.request.user
        return self.models.objects.filter(user=user).annotate(children=F('keyword'))