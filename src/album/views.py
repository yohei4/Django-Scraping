from django.shortcuts import render
from .models import UserImage
import urllib.request
from django.core.files.base import ContentFile
from django.views.decorators.http import require_POST
from django.http import Http404
from django.http import JsonResponse

@require_POST
def save_image(request):
    if request.method == 'POST':  # POSTの処理
        img_title = request.POST.get("title")  # POSTで渡された値
        img_link = request.POST.get("url")
        user = request.user
        mem = urllib.request.urlopen(img_link).read()
        image = UserImage(title=img_title, link=img_link, user=user)
        image.picture.save(img_title + ".jpg", ContentFile(mem), save=False)
        image.save()
        d = {
            'img_title': img_title,
            'img_link': img_link,
            # 'user_name': user.user
        }
        return JsonResponse(d)

@require_POST
def delete_image(request):
    if request.method == "POST":
        try:
            image = UserImage.objects.get(pk=request.POST.get('id'))
        except UserImage.DoesNotExist:
            raise Http404
        image.delete()
        return render(request, "app/home.html")