from django.contrib import admin

from .models import *

class DatabaseFile_Admin(admin.ModelAdmin):
    list_display = ('file_id', 'file_name', 'file_data', 'uploaded_at')
    list_display_links = ['file_name']
    ordering = ['file_name']
    search_fields = ['file_name', 'file_data', 'uploaded_at']
admin.site.register(DatabaseFile, DatabaseFile_Admin)

