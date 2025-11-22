from django.contrib import admin

from .models import Information


@admin.register(Information)
class InformationAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "role", "email", "location")
    search_fields = ("first_name", "last_name", "email", "role")

    fieldsets = (
        (
            "Personal Information",
            {"fields": ("first_name", "last_name", "role", "email", "location")},
        ),
        ("Professional", {"fields": ("summary", "about", "skills")}),
        ("Links & Media", {"fields": ("main_link", "links", "image", "resume")}),
    )
