# Generated by Django 5.1.4 on 2025-03-25 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manage_users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='first_name',
            field=models.CharField(blank=True, max_length=150, verbose_name='first name'),
        ),
        migrations.AddField(
            model_name='employee',
            name='last_name',
            field=models.CharField(blank=True, max_length=150, verbose_name='last name'),
        ),
    ]
