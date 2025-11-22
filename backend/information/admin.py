from django.contrib import admin
from .models import Information


@admin.register(Information)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "role")
