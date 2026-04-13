from django.db import models


class Testimony(models.Model):
    # BEFORE HEALING
    before_title = models.CharField(max_length=255)
    before_description = models.TextField(blank=True, null=True)

    before_type = models.CharField(
        max_length=10,
        choices=[('video', 'Video'), ('audio', 'Audio')]
    )
    before_media = models.FileField(upload_to='testimonies/before/')

    # AFTER HEALING
    after_title = models.CharField(max_length=255)
    after_description = models.TextField(blank=True, null=True)

    after_type = models.CharField(
        max_length=10,
        choices=[('video', 'Video'), ('audio', 'Audio')]
    )
    after_media = models.FileField(upload_to='testimonies/after/')

    is_downloadable = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.before_title} → {self.after_title}"