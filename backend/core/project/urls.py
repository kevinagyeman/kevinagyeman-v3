from django.urls import path

from .views import ProjectDetailAPIView, ProjectListCreateAPIView

urlpatterns = [
    path("", ProjectListCreateAPIView.as_view(), name="project_list_api"),
    path(
        "<int:project_id>/", ProjectDetailAPIView.as_view(), name="project_detail_api"
    ),
]
