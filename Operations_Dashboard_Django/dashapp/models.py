from django.db import models

from dbfile.models import *

# Create your models here.

class DashApp(models.Model):
    app_id = models.AutoField(primary_key=True)
    path = models.CharField(db_index=True, max_length=80, unique=True, null=False, blank=False,\
        help_text='Application relative URL - APP_BASENAME')
    name = models.CharField(max_length=40, null=False, blank=False,\
        help_text='Application Display Name')
    template = models.CharField(max_length=80, null=False, blank=False,\
        help_text='Django template path')
    description = models.TextField(null=True, blank=True)
    tags = models.CharField(max_length=120, null=True, blank=True)
    graphic = models.ImageField(null=True, blank=True, storage=DatabaseFileStorage)
    disabled = models.BooleanField(default=False, null=False, blank=False)
    def __str__(self):
       return str(self.path)

class AppCode(models.Model):
    code_id = models.AutoField(primary_key=True)
    name = models.CharField(db_index=True, max_length=40, unique=True, null=False, blank=False,\
        help_text='May only contain alphanumeric and underscore, not start with an underscore, and not be a number')
    alias = models.CharField(max_length=40, null=True, blank=True,\
        help_text='May only contain alphanumeric and underscore, not start with an underscore, and not be a number')        
    code = models.TextField(null=False, blank=False)
    def __str__(self):
       return str(self.name)

class DashAppCode(models.Model):
    id = models.AutoField(primary_key=True)
    dashapp = models.ForeignKey(DashApp, on_delete=models.CASCADE, null=False, blank=False)
    appcode = models.ForeignKey(AppCode, on_delete=models.CASCADE, null=False, blank=False)
    class Meta:
        unique_together = ('dashapp', 'appcode')
    def __str__(self):
       return f'{self.dashapp}:{self.appcode}'

class DashAppGroup(models.Model):
    id = models.AutoField(primary_key=True)
    dashapp = models.ForeignKey(DashApp, db_index=True, on_delete=models.CASCADE, null=False, blank=False)
    group = models.CharField(max_length=150, null=False, blank=False)
    class Meta:
        unique_together = ('dashapp', 'group')
    def __str__(self):
       return f'{dashapp}:{group}'

