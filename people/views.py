from django.shortcuts import render
from rest_framework import generics
from django.views.generic import ListView

from .models import People
from .serializers import PeopleSerializer


class PeopleListView(generics.ListAPIView):
    queryset = People.objects.all()
    serializer_class = PeopleSerializer
    


class PeopleHomeView(ListView):
    template_name = 'people/home.html'
    queryset = People.objects.all()
    context_object_name = 'family'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = "Home"
        return context
    