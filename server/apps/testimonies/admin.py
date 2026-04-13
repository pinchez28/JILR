from django.contrib import admin
from .models import Testimony


@admin.register(Testimony)
class TestimonyAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'before_title',
        'after_title',
        'is_downloadable',
        'created_at',
    )

    search_fields = (
        'before_title',
        'after_title',
        'before_description',
        'after_description',
    )

    list_filter = (
        'is_downloadable',
        'created_at',
    )
