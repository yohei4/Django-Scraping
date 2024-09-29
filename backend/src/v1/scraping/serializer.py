import hashlib
import random, string
from urllib.request import urlopen
from django.core.files.base import ContentFile
from rest_framework import serializers
from .models import ScrapingHistory

class ScrapingHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = ScrapingHistory
        fields = ('url', 'keyword')

class ScrapingSerializer(serializers.Serializer):

    keyword = serializers.CharField()

    class Meta:
        fields = ('keyword')

