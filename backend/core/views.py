import requests
from django.conf import settings
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class VercelRedeployView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        webhook_url = getattr(settings, "VERCEL_WEBHOOK_URL", None)
        if not webhook_url:
            return Response(
                {"detail": "Webhook URL not configured"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        response = requests.post(webhook_url)

        if 200 <= response.status_code < 300:
            return Response({"detail": "Redeploy triggered successfully"})
        else:
            return Response(
                {"detail": f"Failed to trigger redeploy: {response.text}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
