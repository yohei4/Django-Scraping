from django.db import models
# from account.models import User
from django.contrib.auth import get_user_model

User = get_user_model()
# Create your models here.

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.user.id, filename)

class UserImage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=True)
    picture = models.ImageField(upload_to=user_directory_path, null=True, blank=True, unique=True)
    title = models.CharField(max_length=50, null=True)
    link = models.URLField(max_length=200, null=True)

    def __str__(self):
        return self.title