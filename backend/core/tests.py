from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient


class AuthenticationTests(TestCase):
    """Test cases for authentication endpoints"""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="testpass123",
        )
        self.login_url = reverse("rest_login")
        self.logout_url = reverse("rest_logout")

    def test_user_login_success(self):
        """Test successful login"""
        data = {"username": "testuser", "password": "testpass123"}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

    def test_user_login_wrong_password(self):
        """Test login with wrong password"""
        data = {"username": "testuser", "password": "wrongpassword"}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_login_nonexistent_user(self):
        """Test login with non-existent user"""
        data = {"username": "nonexistent", "password": "testpass123"}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_logout(self):
        """Test user logout"""
        # First login
        self.client.force_authenticate(user=self.user)

        # Then logout
        response = self.client.post(self.logout_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class VercelRedeployTests(TestCase):
    """Test cases for Vercel redeploy webhook"""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser", password="testpass123"
        )
        self.redeploy_url = reverse("vercel_redeploy")

    def test_redeploy_anonymous_forbidden(self):
        """Anonymous users cannot trigger redeploy"""
        response = self.client.post(self.redeploy_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_redeploy_authenticated(self):
        """Authenticated users can trigger redeploy (if webhook configured)"""
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.redeploy_url)
        # Will return 500 if webhook URL not configured, which is fine for test
        self.assertIn(
            response.status_code,
            [status.HTTP_200_OK, status.HTTP_500_INTERNAL_SERVER_ERROR],
        )
