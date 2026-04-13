from django.contrib import admin
from .models import GalleryItem

@admin.register(GalleryItem)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_downloadable', 'created_at')
    search_fields = ('title', 'description')