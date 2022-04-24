from uuid import uuid4
from django.db import models


def upload_image_to(_instance, filename: str):
    return f"static/images/{uuid4()}_{filename}"


class Company(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    image = models.ImageField(upload_to=upload_image_to)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Companies"


class Job(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid4)

    title = models.CharField(max_length=100)
    description = models.TextField()
    application_url = models.URLField()

    full_time = models.BooleanField(default=True)
    remote = models.BooleanField(default=False)

    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
