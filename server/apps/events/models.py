from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    location = models.CharField(max_length=255, blank=True)
    poster = models.ImageField(upload_to='events/', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def duration(self):
        return (self.end_date - self.start_date).days

    def start_day(self):
        return self.start_date.strftime("%A")

    def end_day(self):
        return self.end_date.strftime("%A")