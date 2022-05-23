from django.db import models
from django.contrib.auth import get_user_model
from datetime import datetime

User = get_user_model()
# Create your models here.

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.user.id, filename)

class UserImage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=True)
    picture = models.ImageField(upload_to=user_directory_path, null=True, blank=True, unique=True)
    name = models.CharField(max_length=50, null=True)
    link = models.URLField(max_length=200, null=True)
    keyword = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField('作成日時', auto_now_add=True, null=True)
    updated_at = models.DateTimeField('更新日時', auto_now=True, null=True)

    class Meta:
        db_table = 'user_images'

    def __str__(self):
        return self.name