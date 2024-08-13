from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.PeopleListView.as_view()),
    path('', views.PeopleHomeView.as_view()),
]
