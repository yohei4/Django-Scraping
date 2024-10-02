import hashlib
import random, string
from urllib.request import urlopen
from django.core.files.base import ContentFile
from rest_framework import serializers
from .models import UserImage, UserImageKeyword

class UserImageSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = UserImage
        fields = ['id', 'path', 'filename', 'token', 'origin_link']

    def get_token(self, obj):
        hash_input = f"{obj.id}{obj.user_id}{obj.filename}{obj.created_at}".encode('utf-8')
        return hashlib.sha256(hash_input).hexdigest()
    
    def create(self, validated_data: dict[str, any]):
        img_link = validated_data.get('origin_link')
        filename = ''.join(random.choices(string.ascii_letters + string.digits, k=30))
        
        mem, ext, content_type = self.fetch_image(img_link)

        # 画像の保存
        image = UserImage(filename=filename, content_type=content_type, extention=ext, **validated_data)
        image.path.save(f"{filename}{ext}", ContentFile(mem), save=False)
        image.save()

        return image

    def fetch_image(self, img_link: str) -> tuple[bytes, str, str]:
        response = urlopen(img_link)
        mem = response.read()

        # Content-Typeから拡張子を取得
        content_type = response.getheader('Content-Type')
        if content_type:
            if 'image/jpeg' in content_type:
                ext = '.jpg'
            elif 'image/png' in content_type:
                ext = '.png'
            elif 'image/gif' in content_type:
                ext = '.gif'
            else:
                ext = '.bin'  # その他の画像形式の場合
        else:
            ext = '.jpg'  # デフォルトは.jpg

        return mem, ext, content_type
    
class UserImageKeywordSerializer(serializers.ModelSerializer):
    origin_link = serializers.URLField()

    class Meta:
        model = UserImageKeyword
        fields = ['origin_link', 'keyword']
    
    def create(self, validated_data: dict[str, any]):
        validated_data.pop('origin_link')
        keyword = UserImageKeyword(**validated_data)
        keyword.save()
        return keyword
