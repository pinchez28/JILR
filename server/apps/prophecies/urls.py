from rest_framework.routers import DefaultRouter
from .views import ProphecyViewSet, FulfillmentViewSet

router = DefaultRouter()

# ✅ CLEAN REST ROUTES
router.register(r'prophecies', ProphecyViewSet, basename='prophecies')
router.register(r'fulfillments', FulfillmentViewSet, basename='fulfillments')

urlpatterns = router.urls