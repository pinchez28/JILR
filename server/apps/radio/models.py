from django.db import models
from django.utils.timezone import now

class Recording(models.Model):
    STATUS_CHOICES = [
        ('recording', 'Recording'),
        ('recorded', 'Recorded'),
        ('downloaded', 'Downloaded'),
        ('deleted', 'Deleted'),
        ('failed', 'Failed'),
    ]

    session_id = models.CharField(max_length=255)  # 🔥 NEW

    file = models.FileField(upload_to='recordings/', null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='recording')

    created_at = models.DateTimeField(auto_now_add=True)
    recorded_at = models.DateTimeField(null=True, blank=True)
    downloaded_at = models.DateTimeField(null=True, blank=True)

    duration = models.IntegerField(null=True, blank=True)
    size_mb = models.FloatField(null=True, blank=True)

    download_attempts = models.IntegerField(default=0)  # 🔥 NEW

    def __str__(self):
        return f"Recording {self.id} - {self.status}"



class RadioSettings(models.Model):
    stream_url = models.URLField()
    max_duration_minutes = models.IntegerField(default=90)  # 🔥 NEW: Configurable max duration