from rest_framework import viewsets
from rest_framework.decorators import action
from django.http import FileResponse

from .models import Prophecy, Fulfillment
from .serializers import ProphecySerializer, FulfillmentSerializer


# =========================
# PROPHECY VIEWSET
# =========================
class ProphecyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Prophecy.objects.all().order_by('-created_at')
    serializer_class = ProphecySerializer

    # 📥 DOWNLOAD PROPHECY MEDIA
    @action(detail=True, methods=['get'], url_path='download')
    def download(self, request, pk=None):
        prophecy = self.get_object()
        file = prophecy.prophecy_media

        return FileResponse(
            file.open(),
            as_attachment=True,
            filename=file.name
        )


# =========================
# FULFILLMENT VIEWSET
# =========================
class FulfillmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Fulfillment.objects.all().order_by('-created_at')
    serializer_class = FulfillmentSerializer

    # 📥 DOWNLOAD FULFILLMENT MEDIA
    @action(detail=True, methods=['get'], url_path='download')
    def download(self, request, pk=None):
        fulfillment = self.get_object()
        file = fulfillment.fulfillment_media

        return FileResponse(
            file.open(),
            as_attachment=True,
            filename=file.name
        )