from django.db import transaction
from rest_framework.views import APIView
from rest_framework import viewsets, status, permissions
from rest_framework.request import Request
from rest_framework.response import Response
from .serializer import ScrapingSerializer, ScrapingHistorySerializer
from .models import ScrapingHistory
from .services import ScarpingImage

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
        service = ScarpingImage(safe=False)
        result, links = service.exec(request.data.get('keyword'), 1)
        
        return Response(links, status=status.HTTP_200_OK)