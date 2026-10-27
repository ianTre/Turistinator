from django.http import HttpResponse
from django.shortcuts import render
from .models import Attraction

def index(request):
    attractions = Attraction.objects.all()
    return render(request, 'index.html', {'attractions': attractions})

def new(request):
    return HttpResponse("Wow , that is a new attraction!")
