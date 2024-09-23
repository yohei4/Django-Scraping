from django.contrib import admin
from . models import UserImage, UserImageKeyword

# Register your models here.

admin.site.register(UserImage)
admin.site.register(UserImageKeyword)