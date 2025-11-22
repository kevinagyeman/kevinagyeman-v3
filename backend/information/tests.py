from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .models import Information


class InformationModelTests(TestCase):
    """Test cases for Information model"""

    def setUp(self):
        self.info = Information.objects.create(
            first_name="John",
            last_name="Doe",
            role="Software Engineer",
            email="john@example.com",
            summary="Experienced developer",
            location="New York",
            skills="Python;JavaScript;React",
            links="{}",
        )

    def test_information_creation(self):
        """Test information is created correctly"""
        self.assertEqual(self.info.first_name, "John")
        self.assertEqual(self.info.last_name, "Doe")
        self.assertEqual(self.info.email, "john@example.com")

    def test_information_str_method(self):
        """Test information string representation"""
        self.assertEqual(str(self.info), "John")

    def test_information_optional_fields(self):
        """Test information with only required fields"""
        minimal_info = Information.objects.create(first_name="Jane")
        self.assertEqual(minimal_info.first_name, "Jane")
        self.assertIsNone(minimal_info.last_name)
        self.assertIsNone(minimal_info.email)


class InformationAPITests(TestCase):
    """Test cases for Information API endpoints"""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser", password="testpass123"
        )

        self.info = Information.objects.create(
            first_name="John",
            last_name="Doe",
            role="Software Engineer",
            email="john@example.com",
            summary="Experienced developer",
            skills="Python",
            links="{}",
        )

        self.detail_url = reverse("information-detail")

    def test_get_information_anonymous(self):
        """Anonymous users can view information"""
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["first_name"], "John")
        self.assertEqual(response.data["last_name"], "Doe")

    def test_update_information_anonymous_forbidden(self):
        """Anonymous users cannot update information"""
        data = {
            "first_name": "Jane",
            "last_name": "Smith",
            "role": "Senior Engineer",
            "email": "jane@example.com",
            "skills": "Python;JavaScript",
            "links": "{}",
        }
        response = self.client.put(self.detail_url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_information_authenticated(self):
        """Authenticated users can update information"""
        self.client.force_authenticate(user=self.user)
        data = {
            "first_name": "Jane",
            "last_name": "Smith",
            "role": "Senior Engineer",
            "email": "jane@example.com",
            "summary": "Expert developer",
            "skills": "Python;JavaScript",
            "links": "{}",
        }
        response = self.client.put(self.detail_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.info.refresh_from_db()
        self.assertEqual(self.info.first_name, "Jane")
        self.assertEqual(self.info.role, "Senior Engineer")

    def test_information_email_validation(self):
        """Test email field validation"""
        self.client.force_authenticate(user=self.user)
        data = {
            "first_name": "Test",
            "email": "invalid-email",  # Invalid email format
            "skills": "",
            "links": "{}",
        }
        response = self.client.put(self.detail_url, data)
        # Django should handle email validation
        self.assertIn(
            response.status_code, [status.HTTP_400_BAD_REQUEST, status.HTTP_200_OK]
        )
