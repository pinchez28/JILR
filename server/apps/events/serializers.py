from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    duration = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'description',
            'start_date',
            'end_date',
            'start_day',
            'end_day',
            'location',
            'poster',
            'duration',
            'created_at',
        ]

    def get_duration(self, obj):
        return obj.duration()