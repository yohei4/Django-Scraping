from django.db import transaction, connection
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
        scraper = ScarpingImage(safe=False)
        result, images = scraper.exec(request.data.get("keyword"), 1)

        if result:
            serializer = ScrapingHistorySerializer(data={ 'keyword': request.data.get('keyword'), 'url': scraper.url })
            if (serializer.is_valid()):
                serializer.save(user=request.user)

        return Response(images, status=status.HTTP_200_OK)
    
class ScrapingHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    '''
        スクレイピング履歴一覧
    '''
    permission_classes = [permissions.IsAuthenticated]
    models = ScrapingHistory
    serializer_class = ScrapingHistorySerializer

    def get_queryset(self):
        user_id = self.request.user.id
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT MIN(id) as id, keyword
                FROM scraping_history
                WHERE user_id = %s
                GROUP BY keyword
            """, [user_id])
            ids = [row[0] for row in cursor.fetchall()]
        return self.models.objects.filter(id__in=ids).annotate(children=F('keyword'))