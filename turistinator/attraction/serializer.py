from rest_framework import serializers
from .models import Attraction , AttractionPhoto

class AttractionPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttractionPhoto
        fields = ['image_route']

class AttractionSerializer(serializers.ModelSerializer):

    Photos = AttractionPhotoSerializer()
    class Meta:
        model = Attraction
        fields = ['id', 'name' , 'tipology' , 'description' , 'coordinates' , 'city' ,'Photos']
