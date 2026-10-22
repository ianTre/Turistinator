from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return HttpResponse("Wow , what an attraction!")

def new(request):
    return HttpResponse("Wow , that is a new attraction!")
