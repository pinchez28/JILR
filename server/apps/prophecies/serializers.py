from rest_framework import serializers
from .models import Prophecy, Fulfillment


class FulfillmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fulfillment
        fields = '__all__'


class ProphecySerializer(serializers.ModelSerializer):
    fulfillments = FulfillmentSerializer(many=True, read_only=True)

    class Meta:
        model = Prophecy
        fields = '__all__'