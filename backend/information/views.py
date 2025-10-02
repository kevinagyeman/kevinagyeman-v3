from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Information
from .serializers import InformationSerializer


class InformationDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_object(self):
        return get_object_or_404(Information)

    def get(self, request):
        information = self.get_object()
        serializer = InformationSerializer(information)
        return Response(serializer.data)

    def put(self, request):
        information = self.get_object()
        serializer = InformationSerializer(information, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
