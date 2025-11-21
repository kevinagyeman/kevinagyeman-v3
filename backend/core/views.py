import logging

import requests
from django.conf import settings
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

logger = logging.getLogger(__name__)


class VercelRedeployView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        webhook_url = getattr(settings, "VERCEL_WEBHOOK_URL", None)
        if not webhook_url:
            logger.error("Vercel webhook URL not configured")
            return Response(
                {"detail": "Webhook URL not configured"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        try:
            logger.info(f"Triggering Vercel redeploy for user: {request.user}")
            response = requests.post(webhook_url, timeout=10)

            if 200 <= response.status_code < 300:
                logger.info("Vercel redeploy triggered successfully")
                return Response({"detail": "Redeploy triggered successfully"})
            else:
                logger.error(
                    f"Vercel redeploy failed: {response.status_code} - {response.text}"
                )
                return Response(
                    {"detail": f"Failed to trigger redeploy: {response.text}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        except requests.exceptions.Timeout:
            logger.error("Vercel webhook request timed out")
            return Response(
                {"detail": "Request timed out"},
                status=status.HTTP_504_GATEWAY_TIMEOUT,
            )
        except requests.exceptions.RequestException as e:
            logger.error(f"Vercel webhook request failed: {str(e)}")
            return Response(
                {"detail": f"Request failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
