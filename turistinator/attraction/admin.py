from django.contrib import admin
from .models import Attraction, Location

class AttractionAdmin(admin.ModelAdmin):
    list_display = ('name','tipology', 'description', 'image_url','coordinates')

class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'state', 'country')

admin.site.register(Attraction, AttractionAdmin)
admin.site.register(Location, LocationAdmin)