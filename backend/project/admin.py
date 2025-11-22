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

    fieldsets = (
        (
            "Basic Information",
            {"fields": ("title", "short_description", "description")},
        ),
        ("Timeline", {"fields": ("start_date", "end_date", "is_present_date")}),
        ("Technical Details", {"fields": ("skills", "links", "image")}),
        ("Publishing", {"fields": ("is_published",)}),
    )

    list_editable = ("is_published",)
