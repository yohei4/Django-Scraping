from django.shortcuts import render
from .models import UserImage
import urllib.request
from django.core.files.base import ContentFile
from django.views.decorators.http import require_POST
from django.http import Http404
from django.http import JsonResponse
from common.common import random_string

@require_POST
def save_image(request):
    if request.method == 'POST':  # POSTの処理
        keyword = request.POST.get("keyword")  # POSTで渡された値
        img_link = request.POST.get("url")
        file_name = random_string(15)

        user = request.user
        mem = urllib.request.urlopen(img_link).read()
        image = UserImage(name=file_name, link=img_link, keyword=keyword, user=user)
        image.picture.save(file_name + ".jpg", ContentFile(mem), save=False)
        image.save()
        d = {
            'file_name': file_name,
            'img_link': img_link,
            'keyword': keyword
        }
        return JsonResponse(d)

@require_POST
def delete_image(request):
    if request.method == "POST":
        try:
            image = UserImage.objects.get(pk=request.POST.get('id'), user=request.user)
        except UserImage.DoesNotExist:
            raise Http404
        image.delete()
        d = {
            'id': request.POST.get('id')
        }
        return JsonResponse(d)