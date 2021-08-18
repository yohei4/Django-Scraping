from django import forms
from django.shortcuts import render,redirect
from django.contrib.auth.views import(LoginView, LogoutView)
from django.views.generic.edit import CreateView
from django.contrib.auth.views import SuccessURLAllowedHostsMixin

from .models import User
from .forms import EmailAuthenticationForm, UserCreateForm
from django.contrib.auth.mixins import LoginRequiredMixin


# Create your views here.

def index(request):
    return render(request, 'home.html')

class Login(LoginView):
    model = User
    form_class = EmailAuthenticationForm
    template_name = 'account/login.html'

class CreateAccount(CreateView):
    model = User
    form_class = UserCreateForm
    template_name = 'account/account.html'
    # success_url = reverse_lazy('account/login.html')

    def post(self, request, *args, **kwargs):
        form = self.form_class(data=request.POST)
        if form.is_valid():
            form.save()
            return redirect( 'account:login' )
        return render(request, 'account/account.html', {'form': form})