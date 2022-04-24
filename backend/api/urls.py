from django.urls import path
from api.views import CompanyDetailView, CompanyListView, JobDetailView, JobListView

urlpatterns = [
    path("companies", CompanyListView.as_view(), name="company-list"),
    path("companies/<str:pk>", CompanyDetailView.as_view(), name="company-detail"),
    path("jobs", JobListView.as_view(), name="job-list"),
    path("jobs/<str:pk>", JobDetailView.as_view(), name="job-detail"),
]
