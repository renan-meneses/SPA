import uuid
from django.db import models
from django.utils import timezone

class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        abstract = True
        
    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()  # Corrigido de 'update_at' para 'updated_at'
        super().save(*args, **kwargs)