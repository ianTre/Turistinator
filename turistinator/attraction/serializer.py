from rest_framework import serializers
from .models import Attraction , AttractionPhoto

class AttractionPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttractionPhoto
        fields = ["id", "image_route", "alt_desc"]

class AttractionSerializer(serializers.ModelSerializer):

    photos = AttractionPhotoSerializer(many=True , read_only=True)
    class Meta:
        model = Attraction
        fields = ['id', 'name' , 'tipology' , 'description' , 'coordinates' , 'city' ,'photos']
