from django.db import models


class Information(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    role = models.CharField(max_length=255, null=True, blank=True)
    main_link = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    summary = models.TextField(null=True, blank=True)
    about = models.CharField(max_length=160, null=True, blank=True)
    skills = models.TextField(null=True, blank=True)
    links = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="information/", null=True, blank=True)
    resume = models.FileField(upload_to="resumes/", null=True, blank=True)

    def __str__(self):
        return self.first_name
