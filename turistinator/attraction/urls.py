from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import AttractionViewSet, AttractionPhotoViewSet

router = DefaultRouter()

router.register(
    r"attractions",
    AttractionViewSet,
    basename="attraction"
)

router.register(
    r"photos",
    AttractionPhotoViewSet,
    basename="attractionphoto"
)

urlpatterns = router.urls