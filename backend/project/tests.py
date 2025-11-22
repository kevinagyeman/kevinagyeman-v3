from datetime import date

from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .models import Project


class ProjectModelTests(TestCase):
    """Test cases for Project model"""

    def setUp(self):
        self.project = Project.objects.create(
            title="Test Project",
            description="Test description",
            short_description="Short desc",
            start_date=date(2024, 1, 1),
            end_date=date(2024, 12, 31),
            is_published=True,
            skills="Python;Django;React",
            links="{}",
        )

    def test_project_creation(self):
        """Test project is created correctly"""
        self.assertEqual(self.project.title, "Test Project")
        self.assertEqual(self.project.description, "Test description")
        self.assertTrue(self.project.is_published)

    def test_project_str_method(self):
        """Test project string representation"""
        self.assertEqual(str(self.project), "Test Project")

    def test_project_dates(self):
        """Test project date fields"""
        self.assertEqual(self.project.start_date, date(2024, 1, 1))
        self.assertEqual(self.project.end_date, date(2024, 12, 31))
        self.assertFalse(self.project.is_present_date)

    def test_project_present_date(self):
        """Test project with present date"""
        ongoing_project = Project.objects.create(
            title="Ongoing Project",
            start_date=date(2024, 1, 1),
            is_present_date=True,
            is_published=True,
        )
        self.assertTrue(ongoing_project.is_present_date)
        self.assertIsNone(ongoing_project.end_date)


class ProjectAPITests(TestCase):
    """Test cases for Project API endpoints"""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser", password="testpass123"
        )

        # Create published and unpublished projects
        self.published_project = Project.objects.create(
            title="Published Project",
            description="Published description",
            start_date=date(2024, 1, 1),
            is_published=True,
            skills="Python",
            links="{}",
        )

        self.unpublished_project = Project.objects.create(
            title="Unpublished Project",
            description="Unpublished description",
            start_date=date(2024, 6, 1),
            is_published=False,
            skills="JavaScript",
            links="{}",
        )

        self.list_url = reverse("project-list")

    def test_get_published_projects_anonymous(self):
        """Anonymous users should only see published projects"""
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Published Project")

    def test_get_all_projects_authenticated(self):
        """Authenticated users should see all projects"""
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_get_project_detail_anonymous(self):
        """Anonymous users can view published project details"""
        url = reverse(
            "project-detail", kwargs={"project_id": self.published_project.id}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Published Project")

    def test_create_project_anonymous_forbidden(self):
        """Anonymous users cannot create projects"""
        data = {
            "title": "New Project",
            "start_date": "2024-01-01",
            "is_published": True,
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_project_authenticated(self):
        """Authenticated users can create projects"""
        self.client.force_authenticate(user=self.user)
        data = {
            "title": "New Project",
            "description": "New description",
            "start_date": "2024-01-01",
            "is_published": True,
            "skills": "Python;Django",
            "links": "{}",
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Project.objects.count(), 3)

    def test_update_project_authenticated(self):
        """Authenticated users can update projects"""
        self.client.force_authenticate(user=self.user)
        url = reverse(
            "project-detail", kwargs={"project_id": self.published_project.id}
        )
        data = {
            "title": "Updated Project",
            "description": "Updated description",
            "start_date": "2024-01-01",
            "is_published": True,
            "skills": "Python;Django;React",
            "links": "{}",
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.published_project.refresh_from_db()
        self.assertEqual(self.published_project.title, "Updated Project")

    def test_delete_project_authenticated(self):
        """Authenticated users can delete projects"""
        self.client.force_authenticate(user=self.user)
        url = reverse(
            "project-detail", kwargs={"project_id": self.published_project.id}
        )
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Project.objects.count(), 1)

    def test_delete_project_anonymous_forbidden(self):
        """Anonymous users cannot delete projects"""
        url = reverse(
            "project-detail", kwargs={"project_id": self.published_project.id}
        )
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_projects_ordered_by_date(self):
        """Projects should be ordered by start_date descending"""
        Project.objects.create(
            title="Newest Project",
            start_date=date(2024, 12, 1),
            is_published=True,
            skills="",
            links="{}",
        )
        response = self.client.get(self.list_url)
        self.assertEqual(response.data[0]["title"], "Newest Project")
