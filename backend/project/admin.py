from django.contrib import admin

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "start_date",
        "end_date",
        "is_published",
        "is_present_date",
    )
    list_filter = ("is_published", "is_present_date", "start_date")
    search_fields = ("title", "description", "skills")
    date_hierarchy = "start_date"
    ordering = ("-start_date",)
    list_editable = ("is_published",)
