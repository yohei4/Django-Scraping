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
        fields = ('path', 'filename', 'token', 'origin_link')

    def get_token(self, obj):
        hash_input = f"{obj.id}{obj.user_id}{obj.filename}{obj.created_at}".encode('utf-8')
        return hashlib.sha256(hash_input).hexdigest()
    
    def create(self, validated_data: dict[str, any]):
        user = validated_data.pop('user')
        img_link = validated_data.pop('origin_link')
        filename = ''.join(random.choices(string.ascii_letters + string.digits, k=255))
        
        mem, ext = self.fetch_image(img_link)

        # 画像の保存
        image = UserImage(filename=filename, user=user, **validated_data)
        image.path.save(f"{filename}{ext}", ContentFile(mem), save=False)
        image.save()

        return image

    def fetch_image(img_link: str) -> tuple[bytes, str]:
        """
        指定されたURLから画像を取得し、バイナリデータと拡張子を返します。

        Args:
            img_link (str): 画像のURL

        Returns:
            Tuple[bytes, str]: 画像のバイナリデータと拡張子
        """
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

        return mem, ext
    
class UserImageKeywordSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserImageKeyword
        fields = ('keyword')
    
    def create(self, validated_data: dict[str, any]):
        image = validated_data.pop('image')
        UserImageKeyword(image, **validated_data)
