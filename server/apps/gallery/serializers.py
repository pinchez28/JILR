from rest_framework import serializers
from .models import GalleryItem

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryItem
        fields = '__all__'