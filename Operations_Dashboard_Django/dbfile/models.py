from django.db import models
from django.core.files import storage, base

import uuid

# Create your models here.

class DatabaseFile(models.Model):
    file_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file_name = models.CharField(max_length=100, null=True)
    file_data = models.BinaryField(null=True, editable=True)
    content_type = models.CharField(max_length=100, null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.file_name} ({self.file_id})'


class DatabaseFileStorage(storage.Storage):
    def _save(self, file_id, content):
        file = DatabaseFile.objects.get(pk=file_id)
        file.file_data = content.read()
        file.content_type = content.content_type
        file.save()
        return file_id

    def _open(self, file_id, mode='rb'):
        file = DatabaseFile.objects.get(file_id=file_id)
        return base.ContentFile(file.file_data)

    def delete(self, file_id):
        DatabaseFile.objects.filter(file_id=file_id).delete()

    def exists(self, file_id):
        return DatabaseFile.objects.filter(file_id=file_id).exists()

    def list_dir(self, path):
        # Handle listing directories if needed, return empty list
        return [], [f.file_name for f in DatabaseFile.objects.all()]

    def size(self, file_id):
        return len(DatabaseFile.objects.get(file_id=file_id).file_data)

    def get_available_name(self, file_name, max_length=None):
        # Handle name availability if needed
        file = DatabaseFile.objects.create(file_name=file_name)
        return f'{file.file_id}'

    def url(self, file_id):
        # Handle URL generation if needed, return None
        return f'/dbfile/files/{file_id}'
