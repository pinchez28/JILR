from rest_framework.viewsets import ReadOnlyModelViewSet
from .models import Event
from .serializers import EventSerializer


class EventViewSet(ReadOnlyModelViewSet):
    queryset = Event.objects.all().order_by('-start_date')
    serializer_class = EventSerializer