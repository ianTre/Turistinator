from rest_framework import viewsets
from .models import Attraction, AttractionPhoto
from .serializer import AttractionSerializer, AttractionPhotoSerializer


class AttractionViewSet(viewsets.ModelViewSet):

    queryset = Attraction.objects.all()

    serializer_class = AttractionSerializer

class AttractionPhotoViewSet(viewsets.ModelViewSet):
    queryset = AttractionPhoto.objects.all()
    serializer_class = AttractionPhotoSerializer