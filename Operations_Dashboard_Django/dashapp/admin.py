from django.contrib import admin
from django.forms.widgets import Textarea

# Register your models here.
from .models import *

class DashApp_Admin(admin.ModelAdmin):
    list_display = ['path', 'name', 'disabled', 'app_id']
    list_display_links = ['path']
    ordering = ['path']
    search_fields = ['path', 'name', 'template']
    save_as = True
    formfield_overrides = {
        models.TextField: {'widget': Textarea},
    }
admin.site.register(DashApp, DashApp_Admin)

class AppCode_Admin(admin.ModelAdmin):
    list_display = ['name','alias', 'code_id']
    list_display_links = ['name']
    ordering = ['name']
    search_fields = ['name', 'alias']
    save_as = True
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 40, 'cols': 100})},
    }
admin.site.register(AppCode, AppCode_Admin)

class DashAppCode_Admin(admin.ModelAdmin):
    list_display = ['dashapp', 'appcode', 'get_appcode_alias', 'id']
    list_display_links = ['id']
    ordering = ['dashapp', 'appcode']
    search_fields = ['dashapp', 'appcode']
    save_as = True
    def get_appcode_alias(self, obj):
        return obj.appcode.alias
    get_appcode_alias
admin.site.register(DashAppCode, DashAppCode_Admin)

class DashAppGroup_Admin(admin.ModelAdmin):
    list_display = ['dashapp', 'group', 'id']
    list_display_links = ['id']
    ordering = ['dashapp']
    search_fields = ['dashapp', 'group']
admin.site.register(DashAppGroup, DashAppGroup_Admin)
