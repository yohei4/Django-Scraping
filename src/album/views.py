import json, urllib.request, base64
from .models import UserImage
from django.db import IntegrityError, transaction, DatabaseError
from django.http import JsonResponse, HttpResponse
from django.http.request import HttpRequest
from django.core.files.base import ContentFile
from django.conf import settings
from django.views.decorators.http import require_POST, require_GET
from common.common import resJson, random_string

@require_GET
def image(request: HttpRequest, token: str):
    src = '' # 変数定義
    if request.method == 'GET':
        try:
            user = request.user
            image = UserImage.objects.get(user=user, name=token)
            src = settings.BASE_DIR._str + image.picture.url
        except (Exception, DatabaseError, IntegrityError, UserImage.DoesNotExist):
            pass
    return src

@require_POST
def save_image(request: HttpRequest):
    responce = resJson() # 変数定義

    if request.method == 'POST':
        user = request.user
        img_link = request.POST.get("url")
        keyword = request.POST.get("keyword")
        file_name = random_string(15)
        mem = urllib.request.urlopen(img_link).read()

        try:
            with transaction.atomic():
                image = UserImage(name=file_name, link=img_link, keyword=keyword, user=user)
                image.picture.save(file_name + ".jpg", ContentFile(mem), save=False)
                image.save()
        except (Exception, DatabaseError, IntegrityError) as e:
            responce.update(reslut=1, message=settings.MESSAGE['INS_FAILED'])
    else:
        responce.update(reslut=1, message=settings.MESSAGE['NOT_POST'])

    return JsonResponse(responce.output())

@require_POST
def all_save_image(request: HttpRequest):
    responce = resJson() # 変数定義

    if request.method == 'POST':
        user = request.user
        keyword = request.POST.get("keyword")
        thumbs = json.loads(request.POST.get("thumbs"))

        try:
            with transaction.atomic():
                for thumb in thumbs:
                    mem = urllib.request.urlopen(thumb['src']).read()
                    file_name = random_string(15)
                    image = UserImage(name=file_name, link=thumb['src'], keyword=keyword, user=user)
                    image.picture.save(file_name + ".jpg", ContentFile(mem), save=False)
                    image.save()
        except (Exception, DatabaseError, IntegrityError) as e:
            responce.update(reslut=1, message=settings.MESSAGE['INS_FAILED'])
    else:
        responce.update(reslut=1, message=settings.MESSAGE['NOT_POST'])

    return JsonResponse(responce.output())

@require_POST
def all_delete_image(request: HttpRequest):
    responce = resJson() # 変数定義

    if request.method == 'POST':
        thumbs = json.loads(request.POST.get("thumbs"))

        try:
            with transaction.atomic():
                for thumb in thumbs:
                    image = UserImage.objects.get(pk=thumb['img-id'], user=request.user)
                    image.delete()
        except UserImage.DoesNotExist as e:
            responce.update(reslut=1, message=e.message)
        except (Exception, DatabaseError, IntegrityError) as e:
            responce.update(reslut=1, message=settings.MESSAGE['DEL_FAILED'])
    else:
        responce.update(reslut=1, message=settings.MESSAGE['NOT_POST'])
        
    return JsonResponse(responce.output())

@require_POST
def delete_image(request: HttpRequest):
    responce = resJson() # 変数定義

    if request.method == "POST":
        try:
            with transaction.atomic():
                image = UserImage.objects.get(pk=request.POST.get('id'), user=request.user)
                image.delete()
        except UserImage.DoesNotExist as e:
            responce.update(reslut=1, message=e.message)
        except (Exception, DatabaseError, IntegrityError) as e:
            responce.update(reslut=1, message=settings.MESSAGE['DEL_FAILED'])
    else:
        responce.update(reslut=1, message=settings.MESSAGE['NOT_POST'])

    return JsonResponse(responce.output())