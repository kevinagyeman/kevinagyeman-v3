from django.urls import path

from .views import InformationDetailAPIView

urlpatterns = [
    path(
        "",
        InformationDetailAPIView.as_view(),
        name="information_detail_api",
    )
]
