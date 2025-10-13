from django.db import models


class Project(models.Model):
    is_published = models.BooleanField(default=False)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_present_date = models.BooleanField(null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    short_description = models.CharField(max_length=160, null=True, blank=True)
    skills = models.TextField(null=True, blank=True)
    links = models.TextField(null=True, blank=True)
    image = models.ImageField(
        upload_to="projects/", null=True, blank=True, default="placeholder.png"
    )

    def __str__(self):
        return self.title
