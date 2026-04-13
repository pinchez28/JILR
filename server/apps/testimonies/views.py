from rest_framework import viewsets
from rest_framework.decorators import action
from django.http import FileResponse
from .models import Testimony
from .serializers import TestimonySerializer


class TestimonyViewSet(viewsets.ModelViewSet):
    queryset = Testimony.objects.all().order_by('-created_at')
    serializer_class = TestimonySerializer

    @action(detail=True, methods=['get'], url_path='download-before')
    def download_before(self, request, pk=None):
        testimony = self.get_object()
        file = testimony.before_media
        return FileResponse(file.open(), as_attachment=True, filename=file.name)

    @action(detail=True, methods=['get'], url_path='download-after')
    def download_after(self, request, pk=None):
        testimony = self.get_object()
        file = testimony.after_media
        return FileResponse(file.open(), as_attachment=True, filename=file.name)