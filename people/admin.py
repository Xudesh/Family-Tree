from django.contrib import admin
from .models import *


class PeopleAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'father_name']
    list_display_links = ['id', 'first_name', 'last_name', 'father_name']
admin.site.register(People, PeopleAdmin)

admin.site.register(Genus)