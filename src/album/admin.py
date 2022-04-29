from django.contrib import admin
from .models import UserImage
# Register your models here.

# class AdminImages(admin.ModelAdmin):
#     list_display = ('user', 'title')
#     fieldsets = [
#         (None,{'fields': ('user', 'picture', 'title', 'link')})
#     ]

# admin.site.register(UserImage, AdminImages)

admin.site.register(UserImage)
