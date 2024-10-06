from rest_framework import serializers
from .models import ScrapingHistory

class ScrapingHistorySerializer(serializers.ModelSerializer):
    children = serializers.ReadOnlyField()

    class Meta:
        model = ScrapingHistory
        fields = ["url", "keyword", "children"]

    def create(self, validated_data: dict[str, any]):
        history = ScrapingHistory(**validated_data)
        history.save()
        return history

class ScrapingSerializer(serializers.Serializer):
    keyword = serializers.CharField()

    class Meta:
        fields = ["keyword"]

