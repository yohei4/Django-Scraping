from django.urls import path

from . import views

app_name = 'account'

urlpatterns = [
    path('home/', views.index, name='index'),
    path('', views.Login.as_view(), name='login'),
    path('newAccount', views.CreateAccount.as_view(), name='account'),
    # path('newAccount/create', views.CreateAccount, name='create')
]