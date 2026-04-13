from rest_framework import serializers
from .models import Testimony


class TestimonySerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimony
        fields = [
            'id',

            'before_title',
            'before_description',
            'before_type',
            'before_media',

            'after_title',
            'after_description',
            'after_type',
            'after_media',

            'is_downloadable',
            'created_at',
        ]