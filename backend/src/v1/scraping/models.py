from django.conf import settings
from django.db import models

# Create your models here.

class ScrapingHistory(models.Model):
    '''
    スクレイピング_履歴
    '''
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False, blank=True)
    keyword = models.CharField(max_length=255, null=True)
    url = models.URLField(null=True)
    created_at = models.DateTimeField('作成日時', auto_now_add=True, null=True)
    updated_at = models.DateTimeField('更新日時', auto_now=True, null=True)

    class Meta:
        db_table = 'scraping_history'

    def __str__(self):
        return self.keyword if self.keyword else 'No Keyword'