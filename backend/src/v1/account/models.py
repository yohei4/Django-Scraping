from django.db import models
from django.contrib.auth.models import ( BaseUserManager, AbstractBaseUser )
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.utils.translation import gettext_lazy as _

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, request_data):
        '''
        Creates and saves a User with the given email, date of
        birth and password.
        '''
        if not request_data['username']: 
            raise ValueError('username is requied.')

        if not request_data['email']:
            raise ValueError('Users must have an email address.')

        # if not request_data['password']:
        #     raise ValueError('Users must have an email password.')
        # elif len(request_data['password']) < 8: # 文字数チェック
        #     raise ValueError('Password must be at least 8 characters.')

        user = self.model(
            username=request_data['username'],
            email=self.normalize_email(request_data['email']),
            is_active=True
        )

        user.set_password(request_data['password'])
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None):
        '''
        Creates and saves a superuser with the given email, date of
        birth and password.
        '''
        request_data = {
            'username': username,
            'email': email,
            'password': password
        }

        user = self.create_user(
            request_data=request_data
        )

        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    
    class Meta:
        db_table = 'users'

    # カスタムユーザーモデル
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        _('ユーザー名'),
        max_length=150, 
        unique=False,
        validators=[username_validator],
    )

    email = models.EmailField(
        _('メールアドレス'),
        max_length=255,
        unique=True,
    )

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField('作成日時', auto_now_add=True, null=True)
    updated_at = models.DateTimeField('更新日時', auto_now=True, null=True)

    objects = UserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        'Does the user have a specific permission?'
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        'Does the user have permissions to view the app `app_label`?'
        # Simplest possible answer: Yes, always
        return True
    
    @property
    def is_staff(self):
        'Is the user a member of staff?'
        # Simplest possible answer: All admins are staff
        return self.is_admin
