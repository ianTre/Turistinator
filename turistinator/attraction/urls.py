from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import AttractionViewSet

router = DefaultRouter()

router.register(
    r"attractions",
    AttractionViewSet,
    basename="attraction"
)

urlpatterns = router.urls