from authentication.views import CookieTokenRefreshView
from django.contrib import admin
from django.shortcuts import redirect
from django.urls import include, path
from rest_framework_simplejwt.views import TokenRefreshView


def root_redirect(request):
    return redirect("/api/projects/")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", root_redirect),  # redirect root a api/projects/
    path("api/auth/", include("authentication.urls")),
    path(
        "api/auth/token/refresh/",
        CookieTokenRefreshView.as_view(),
        name="token_refresh",
    ),
    path("api/projects/", include("project.urls")),  # API progetto qui
]
