# Generated by Django 5.1.1 on 2024-09-28 08:46

import django.db.models.deletion
import v1.album.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path', models.ImageField(blank=True, null=True, unique=True, upload_to=v1.album.models.user_directory_path)),
                ('filename', models.CharField(max_length=255, null=True, unique=True)),
                ('content_type', models.CharField(max_length=100, null=True)),
                ('extention', models.CharField(max_length=100, null=True)),
                ('origin_link', models.URLField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True, verbose_name='作成日時')),
                ('updated_at', models.DateTimeField(auto_now=True, null=True, verbose_name='更新日時')),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'user_images',
            },
        ),
        migrations.CreateModel(
            name='UserImageKeyword',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('keyword', models.CharField(max_length=255, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True, verbose_name='作成日時')),
                ('updated_at', models.DateTimeField(auto_now=True, null=True, verbose_name='更新日時')),
                ('image', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='album.userimage')),
            ],
            options={
                'db_table': 'user_image_keywords',
            },
        ),
    ]
