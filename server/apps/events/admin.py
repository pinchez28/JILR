from django.contrib import admin
from django.utils.html import format_html
from .models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'start_date', 'end_date', 'preview')
    list_filter = ('start_date', 'end_date')
    ordering = ('-start_date',)
    search_fields = ('title', 'location')

    def preview(self, obj):
        if obj.poster:
            return format_html('<img src="{}" width="80" />', obj.poster.url)
        return "No Poster"