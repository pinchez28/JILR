from rest_framework.routers import DefaultRouter
from .views import ProphecyViewSet

router = DefaultRouter()
router.register(r'', ProphecyViewSet)

urlpatterns = router.urls