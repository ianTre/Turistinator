from django.contrib import admin
from .models import Attraction, City, Country, State, AttractionPhoto


class AttractionAdmin(admin.ModelAdmin):
    list_display = ('name','tipology', 'description', 'coordinates', 'city')

class CityAdmin(admin.ModelAdmin):
    list_display = ('name', 'state')

class CountryAdmin(admin.ModelAdmin):
    list_display = ('name', 'id')

class StateAdmin(admin.ModelAdmin):
    list_display = ('name', 'Country')

class AttractionPhotoAdmin(admin.ModelAdmin):
    list_display = ('image_url','alt_desc', 'attraction')


admin.site.register(Attraction, AttractionAdmin)
admin.site.register(City, CityAdmin)
admin.site.register(Country, CountryAdmin)
admin.site.register(State, StateAdmin)
admin.site.register(AttractionPhoto, AttractionPhotoAdmin)