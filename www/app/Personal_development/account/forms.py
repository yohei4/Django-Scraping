from django import forms
from .models import User
from .admin import UserCreationForm
from django.utils.text import capfirst
from django.contrib.auth import (
    authenticate, get_user_model,
)
from django.forms.fields import EmailField
from django.utils.translation import gettext_lazy as _

UserModel = get_user_model()

class UserCreateForm(UserCreationForm):

    class Meta:
        model = User
        fields = ('username', 'email', 'password',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs['class'] = 'form-control'
            field.widget.attrs['placeholder'] = field.label

    def clean_email(self):
        email = self.cleaned_data['email']
        User.objects.filter(email=email, is_active=False).delete()
        if User.objects.filter(email=email).count() != 0:
            raise forms.ValidationError(
            "このメールアドレスは既に登録されています。"
            )
        return email


class EmailAuthenticationForm(forms.Form):
    """
    django.contrib.auth.form.AuthenticationFormをベースに改変
    """

    email = EmailField(
        label=_('Email'),
        widget=forms.EmailInput(attrs={'autofocus': True,})
    )
    password = forms.CharField(
        label=_("Password"),
        strip=False,
        widget=forms.PasswordInput,
    )

    error_messages = {
        'invalid_login': _(
            "Please enter a correct %(username)s and password. Note that both "
            "fields may be case-sensitive."
        ),
        'inactive': _("This account is inactive."),
    }

    def __init__(self, request=None, *args, **kwargs):
        """
        The 'request' parameter is set for custom auth use by subclasses.
        The form data comes in via the standard 'data' kwarg.
        """
        self.request = request
        self.user_cache = None
        kwargs.setdefault('label_suffix', '')
        super().__init__(*args, **kwargs)
        # Set the max length and label for the "username" field.
        self.email_field = UserModel._meta.get_field(UserModel.USERNAME_FIELD)
        self.fields['email'].max_length = self.email_field.max_length or 254
        if self.fields['email'].label is None:
            self.fields['email'].label = capfirst(self.email_field.verbose_name)
        for field in self.fields.values():
            field.widget.attrs["class"] = "form-control"
            field.widget.attrs["placeholder"] = field.label

    def clean(self):
        email = self.cleaned_data.get('email')
        password = self.cleaned_data.get('password')

        if email is not None and password:
            self.user_cache = authenticate(self.request, email=email, password=password)
            if self.user_cache is None:
                raise self.get_invalid_login_error()
            else:
                self.confirm_login_allowed(self.user_cache)

        return self.cleaned_data

    def confirm_login_allowed(self, user):
        """
        Controls whether the given User may log in. This is a policy setting,
        independent of end-user authentication. This default behavior is to
        allow login by active users, and reject login by inactive users.

        If the given user cannot log in, this method should raise a
        ``forms.ValidationError``.

        If the given user may log in, this method should return None.
        """
        if not user.is_active:
            raise forms.ValidationError(
                self.error_messages['inactive'],
                code='inactive',
            )

    def get_user(self):
        return self.user_cache

    def get_invalid_login_error(self):
        return forms.ValidationError(
            self.error_messages['invalid_login'],
            code='invalid_login',
            params={'username': _('Email')},
        )