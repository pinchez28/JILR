from django.db import models


class Prophecy(models.Model):
    MEDIA_TYPE_CHOICES = [
        ('audio', 'Audio'),
        ('video', 'Video'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    prophecy_media = models.FileField(upload_to='prophecies/')
    prophecy_type = models.CharField(max_length=10, choices=MEDIA_TYPE_CHOICES)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Fulfillment(models.Model):
    MEDIA_TYPE_CHOICES = [
        ('audio', 'Audio'),
        ('video', 'Video'),
    ]

    prophecy = models.ForeignKey(
        Prophecy,
        on_delete=models.CASCADE,
        related_name="fulfillments"
    )

    # ✅ NEW FIELD
    title = models.CharField(max_length=255)

    fulfillment_media = models.FileField(upload_to='fulfillments/')
    fulfillment_type = models.CharField(max_length=10, choices=MEDIA_TYPE_CHOICES)

    description = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.prophecy.title})"