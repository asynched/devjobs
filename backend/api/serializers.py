from rest_framework import serializers
from core.models import Company, Job


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        exclude = ("created_at", "updated_at")


class JobSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)

    class Meta:
        model = Job
        exclude = ("created_at", "updated_at")
