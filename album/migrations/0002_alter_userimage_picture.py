# Generated by Django 3.2.4 on 2021-07-12 11:01

import album.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('album', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userimage',
            name='picture',
            field=models.ImageField(blank=True, null=True, upload_to=album.models.user_directory_path),
        ),
    ]
