# Generated by Django 5.0.9 on 2025-02-24 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PathCode',
            fields=[
                ('path', models.CharField(max_length=64, primary_key=True, serialize=False)),
                ('code', models.CharField(max_length=4096)),
            ],
        ),
    ]
