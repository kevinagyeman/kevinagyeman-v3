from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            refresh = response.data["refresh"]
            access = response.data["access"]
            # Set cookies on the original response object
            response.set_cookie(
                key="access_token",
                value=access,
                httponly=True,
                secure=False,  # Change to True if using HTTPS
                samesite="Lax",
            )
            response.set_cookie(
                key="refresh_token",
                value=refresh,
                httponly=True,
                secure=False,
                samesite="Lax",
            )
            # Optionally override the response content
            response.data = {"message": "Login successful"}
        return response


class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        res = Response()
        res.delete_cookie("access_token")
        res.delete_cookie("refresh_token")
        res.data = {"message": "Logged out"}
        return res


class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh = request.COOKIES.get("refresh_token")

        if not refresh:
            return Response(
                {"detail": "Refresh token cookie not set"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = TokenRefreshSerializer(data={"refresh": refresh})
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        response = Response({"message": "Token refreshed"}, status=status.HTTP_200_OK)

        # Aggiorna anche il cookie access_token
        if "access" in data:
            response.set_cookie(
                "access_token",
                data["access"],
                httponly=True,
                secure=True,  # True in produzione
                samesite="Lax",
                max_age=60 * 30,  # tempo di vita del token access
            )

        # Aggiorna il cookie refresh_token se presente (rotazione token)
        if "refresh" in data:
            response.set_cookie(
                "refresh_token",
                data["refresh"],
                httponly=True,
                secure=True,
                samesite="Lax",
                max_age=60 * 60 * 24 * 7,
            )

        return response

    def post(self, request, *args, **kwargs):
        # Ottieni il refresh token dai cookie
        refresh = request.COOKIES.get("refresh_token")

        if not refresh:
            return Response(
                {"detail": "Refresh token cookie not set"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Costruisci serializer con il refresh token preso dai cookie
        serializer = TokenRefreshSerializer(data={"refresh": refresh})
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        response = Response(data, status=status.HTTP_200_OK)

        # Aggiorna il cookie refresh token con nuova durata
        if "refresh" in data:
            response.set_cookie(
                "refresh_token",
                data["refresh"],
                httponly=True,
                secure=True,  # imposta a True in produzione https
                samesite="Lax",
                max_age=60 * 60 * 24 * 7,  # es. una settimana
            )

        return response
