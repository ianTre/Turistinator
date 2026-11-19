from rest_framework import serializers
from django.conf import settings
from .models import Attraction , AttractionPhoto

class AttractionPhotoSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()

    class Meta:
        model = AttractionPhoto
        fields = ["id", "image_url", "alt_desc"]

    def get_image_url(self, obj):
        if not obj.image_route:
            return None

        url = (settings.MEDIA_URL + obj.image_route.lstrip('/'))

        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(url)
        return url

class AttractionSerializer(serializers.ModelSerializer):

    photos = AttractionPhotoSerializer(many=True , read_only=True)
    class Meta:
        model = Attraction
        fields = ['id', 'name' , 'tipology' , 'description' , 'coordinates' , 'city' ,'photos']
