from django.db import models

class GalleryItem(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    image = models.ImageField(upload_to='gallery/')

    is_downloadable = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title