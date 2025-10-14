from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from .authentication import Login, RefreshToken
from .views import VercelRedeployView

schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version="v1",
        description="Test description",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/projects/", include("project.urls")),
    path("api/information/", include("information.urls")),
    # path("api/auth/login/", Login.as_view(), name="custom_login"),
    # path(
    #     "api/auth/token/refresh/", RefreshToken.as_view(), name="custom_token_refresh"
    # ),
    path("api/auth/", include("dj_rest_auth.urls")),
    path("api/redeploy/", VercelRedeployView.as_view(), name="vercel_redeploy"),
]

if settings.DEBUG:
    urlpatterns += [
        path(
            "swagger/",
            schema_view.with_ui("swagger", cache_timeout=0),
            name="schema-swagger-ui",
        ),
        path(
            "redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
        ),
    ]
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
