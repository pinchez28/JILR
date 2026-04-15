from django.db.models import Case, When, IntegerField
from rest_framework.viewsets import ReadOnlyModelViewSet
from .models import Program
from .serializers import ProgramSerializer

class ProgramViewSet(ReadOnlyModelViewSet):
    serializer_class = ProgramSerializer

    def get_queryset(self):
        return Program.objects.filter(is_active=True).annotate(
            day_order=Case(
                *[
                    When(day_of_week=day, then=pos)
                    for pos, day in enumerate(Program.DAY_ORDER)
                ],
                output_field=IntegerField()
            )
        ).order_by('day_order', 'start_time')