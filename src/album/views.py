import json
from .models import UserImage
import urllib.request
from django.core.files.base import ContentFile
from django.views.decorators.http import require_POST
from django.http import Http404, JsonResponse
from common.common import random_string, resJson
from django.db import IntegrityError, transaction, DatabaseError

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
def all_save_image(request):
    responce = resJson()

    if request.method == 'POST':  # POSTの処理
        keyword = request.POST.get("keyword")  # POSTで渡された値
        thumbs = json.loads(request.POST.get("thumbs"))
        user = request.user
        try:
            with transaction.atomic():
                for thumb in thumbs:
                    mem = urllib.request.urlopen(thumb['src']).read()
                    file_name = random_string(15)
                    image = UserImage(name=file_name, link=thumb['src'], keyword=keyword, user=user)
                    image.picture.save(file_name + ".jpg", ContentFile(mem), save=False)
                    image.save()
        except (Exception, DatabaseError, IntegrityError) as e:
            responce.update(reslut=1, message=e)
    else:
        responce.update(reslut=1, message='postではありません。')
    return JsonResponse(responce.output())

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