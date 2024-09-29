from django.conf import settings
from django.db import models

# Create your models here.

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.user.id, filename)

class UserImage(models.Model):
    '''
    ユーザー画像
    '''
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False, blank=True)
    path = models.ImageField(upload_to=user_directory_path, null=True, blank=True, unique=True)
    filename = models.CharField(max_length=255, null=True, unique=True)
    content_type = models.CharField(max_length=100, null=True)
    extention = models.CharField(max_length=100, null=True)
    origin_link = models.URLField(null=True)
    created_at = models.DateTimeField('作成日時', auto_now_add=True, null=True)
    updated_at = models.DateTimeField('更新日時', auto_now=True, null=True)

    class Meta:
        db_table = 'user_images'

    def __str__(self):
        return self.filename if self.filename else 'Unnamed Image'

class UserImageKeyword(models.Model):
    '''
    ユーザー画像_キーワード
    '''
    image = models.ForeignKey(UserImage, on_delete=models.CASCADE, null=False, blank=True)
    keyword = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField('作成日時', auto_now_add=True, null=True)
    updated_at = models.DateTimeField('更新日時', auto_now=True, null=True)

    class Meta:
        db_table = 'user_image_keywords'

    def __str__(self):
        return self.keyword if self.keyword else 'No Keyword'
    