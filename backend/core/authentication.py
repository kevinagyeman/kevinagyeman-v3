from dj_rest_auth.views import LoginView
from django.conf import settings
from django.utils import timezone
from rest_framework_simplejwt.settings import api_settings as jwt_settings
from rest_framework_simplejwt.views import TokenRefreshView


class Login(LoginView):
    authentication_classes = []

    def get_response(self):
        response = super().get_response()

        if getattr(settings, "REST_USE_JWT", False):
            cookie_name = getattr(settings, "JWT_AUTH_COOKIE", None)
            refresh_cookie_name = getattr(settings, "JWT_AUTH_REFRESH_COOKIE", None)
            refresh_cookie_path = getattr(settings, "JWT_AUTH_REFRESH_COOKIE_PATH", "/")

            # Disabilita sicurezza per accesso cookie da JS / middleware Astro
            cookie_secure = False
            cookie_httponly = False  # Permetti accesso a JS
            cookie_samesite = "None"  # Permetti cross-origin

            # read domain from django settings
            cookie_domain = getattr(settings, "SESSION_COOKIE_DOMAIN", None)

            access_token_expiration = (
                timezone.now() + jwt_settings.ACCESS_TOKEN_LIFETIME
            )
            refresh_token_expiration = (
                timezone.now() + jwt_settings.REFRESH_TOKEN_LIFETIME
            )

            if cookie_name:
                response.set_cookie(
                    cookie_name,
                    self.access_token,
                    expires=access_token_expiration,
                    secure=cookie_secure,
                    domain=cookie_domain,
                    httponly=cookie_httponly,
                    samesite=cookie_samesite,
                )

            if refresh_cookie_name:
                response.set_cookie(
                    refresh_cookie_name,
                    self.refresh_token,
                    expires=refresh_token_expiration,
                    secure=cookie_secure,
                    domain=cookie_domain,
                    httponly=cookie_httponly,
                    samesite=cookie_samesite,
                    path=refresh_cookie_path,
                )
        return response


class RefreshToken(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        cookie_name = getattr(settings, "JWT_AUTH_COOKIE", None)
        if cookie_name and response.status_code == 200 and "access" in response.data:
            cookie_secure = False
            cookie_httponly = False  # Permetti accesso a JS/middleware
            cookie_samesite = "None"

            cookie_domain = getattr(settings, "SESSION_COOKIE_DOMAIN", None)

            token_expiration = timezone.now() + jwt_settings.ACCESS_TOKEN_LIFETIME
            response.set_cookie(
                cookie_name,
                response.data["access"],
                expires=token_expiration,
                secure=cookie_secure,
                domain=cookie_domain,
                httponly=cookie_httponly,
                samesite=cookie_samesite,
            )

            response.data["access_token_expiration"] = token_expiration
        return response
