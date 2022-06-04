from django.urls import path
from . import views

app_name = 'album'

urlpatterns = [
    path('save/', views.save_image, name="save"),
    path('all-save/', views.all_save_image, name="all-save"),
    path('all-delete/', views.all_delete_image, name="all-delete"),
    path('delete/', views.delete_image, name="delete")
]