from rest_framework import serializers
from .models import Program


class ProgramSerializer(serializers.ModelSerializer):
    start_time = serializers.TimeField(format="%H:%M")
    end_time = serializers.TimeField(format="%H:%M")

    class Meta:
        model = Program
        fields = '__all__'