from django.db import models

# Create your models here.
class Country(models.Model):
    name = models.CharField(max_length=100)
    search_names = models.CharField(max_length=1000 , null=True)

    # This controls the display name globally
    def __str__(self):
        return self.name

class State(models.Model):
    name = models.CharField(max_length=100)
    Country = models.ForeignKey(Country, on_delete=models.CASCADE)

    def __str__(self):
        return self.name + " - " +  self.Country.name

class City(models.Model):
    name = models.CharField(max_length=200)
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    search_names = models.CharField(max_length=1000 , null=True)
    is_active = models.BooleanField(default=False)

    # This controls the display name globally
    def __str__(self):
        return self.name + " - " +   self.state.name

class Attraction(models.Model):
    name = models.CharField(max_length=200 , default="noName")
    tipology = models.CharField(max_length=100)
    description = models.CharField(max_length=500)

    coordinates = models.CharField(max_length=100)
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=True, blank=True)

class AttractionPhoto(models.Model):
    image_url = models.CharField(max_length=2000)
    alt_desc = models.CharField(max_length=500 , null=True)
    attraction = models.ForeignKey(Attraction, on_delete=models.CASCADE)

