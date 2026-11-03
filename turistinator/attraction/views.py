from rest_framework import viewsets
from .models import Attraction
from .serializer import AttractionSerializer

class AttractionViewSet(viewsets.ModelViewSet):

    queryset = Attraction.objects.all()

    serializer_class = AttractionSerializer