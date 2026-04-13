from rest_framework import generics, filters
from .models import GalleryItem
from .serializers import GallerySerializer

class GalleryListCreateView(generics.ListCreateAPIView):
    queryset = GalleryItem.objects.all().order_by('-created_at')
    serializer_class = GallerySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description']


class GalleryRetrieveView(generics.RetrieveAPIView):
    queryset = GalleryItem.objects.all()
    serializer_class = GallerySerializer