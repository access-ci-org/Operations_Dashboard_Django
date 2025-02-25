from django.contrib import admin
from django.forms.widgets import Textarea
from dashboard.models import *
# Register your models here.

class PathCode_Admin(admin.ModelAdmin):
    list_display = ['path']
    list_display_links = ['path']
    ordering = ['path']
    search_fields = ['path', 'code']
    formfield_overrides = {
        models.TextField: {'widget': Textarea},
    }
    
admin.site.register(PathCode, PathCode_Admin)
