from rest_framework import viewsets
from rest_framework.decorators import action
from django.http import FileResponse

from .models import Teaching
from .serializers import TeachingSerializer


class TeachingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Teaching.objects.all().order_by('-timestamp')
    serializer_class = TeachingSerializer

    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        teaching = self.get_object()

        if not teaching.media_file:
            return Response({"error": "No file found"}, status=404)

        file_handle = teaching.media_file.open('rb')

        response = FileResponse(file_handle, as_attachment=True)
        return response