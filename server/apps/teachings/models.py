from django.db import models


class Teaching(models.Model):

    class MediaType(models.TextChoices):
        AUDIO = "audio", "Audio"
        VIDEO = "video", "Video"

    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)

    media_type = models.CharField(
        max_length=10,
        choices=MediaType.choices
    )

    media_file = models.FileField(
        upload_to="teachings/",
        null=True,
        blank=True
    )

    media_url = models.URLField(
        null=True,
        blank=True
    )

    # ✅ NEW: controls whether user can download it
    is_downloadable = models.BooleanField(default=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.media_type})"