from django.db import models

# Create your models here.
class Attraction(models.Model):
    tipology = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    image_url = models.CharField(max_length=2000)
    coordinates = models.CharField(max_length=100)

