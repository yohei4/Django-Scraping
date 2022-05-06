from django.urls import path

from . import views

app_name = 'album'

urlpatterns = [
    path('', views.save_image, name="save"),
    path('delete/', views.delete_image, name="delete")
]