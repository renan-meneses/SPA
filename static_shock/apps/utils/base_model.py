import uuid

from django.db import models
from django.utils import timezone

class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        abstract = True
        
    def save(self, **kwargs):
        self.update_at = timezone.now()
        super.save(**kwargs)