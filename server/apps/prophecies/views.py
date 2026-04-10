from django.shortcuts import render
from rest_framework import viewsets
from .models import Prophecy, Fulfillment
from .serializers import ProphecySerializer, FulfillmentSerializer


class ProphecyViewSet(viewsets.ModelViewSet):
    queryset = Prophecy.objects.all().order_by('-created_at')
    serializer_class = ProphecySerializer


class FulfillmentViewSet(viewsets.ModelViewSet):
    queryset = Fulfillment.objects.all().order_by('-created_at')
    serializer_class = FulfillmentSerializer

from rest_framework import viewsets
from .models import Prophecy
from .serializers import ProphecySerializer


class ProphecyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Prophecy.objects.all().order_by('-created_at')
    serializer_class = ProphecySerializer