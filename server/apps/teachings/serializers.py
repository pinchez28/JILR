from rest_framework import serializers
from .models import Teaching


class TeachingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teaching
        fields = '__all__'

    def validate(self, data):
        media_file = data.get("media_file")
        media_url = data.get("media_url")

        if not media_file and not media_url:
            raise serializers.ValidationError(
                "Either media_file or media_url must be provided."
            )

        return data