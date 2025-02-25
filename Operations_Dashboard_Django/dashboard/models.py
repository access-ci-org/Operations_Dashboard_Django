from django.db import models

from django.utils.safestring import mark_safe

# PLACE ANY DASHBOARD MODELS HERE

class PathCode(models.Model):
    path = models.CharField(primary_key=True, max_length=64)
    code = models.TextField(max_length=4096)

    def __str__(self):
       return str(self.path)
