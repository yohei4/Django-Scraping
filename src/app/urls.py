from django.urls import path

from . import views

app_name = 'app'

urlpatterns = [
    # path('', views.index, name='index'), # テスト用
    path('', views.HomeInView.as_view(), name='index'),
    path('list/', views.ImagesList.as_view(), name='list')
]