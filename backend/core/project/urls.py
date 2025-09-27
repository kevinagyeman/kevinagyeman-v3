from django.urls import path

from .views import ProjectDetailAPIView, ProjectListCreateAPIView

urlpatterns = [
    path(
        "", ProjectListCreateAPIView.as_view(), name="project_list_api"
    ),  # QUI il prefisso è gestito da core.urls
    path(
        "<int:project_id>/", ProjectDetailAPIView.as_view(), name="project_detail_api"
    ),
]
