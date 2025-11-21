import json

from django.core.management.base import BaseCommand

from information.models import Information
from project.models import Project


class Command(BaseCommand):
    help = "Convert JSON-formatted skills and links back to plain text"

    def handle(self, *args, **options):
        # Fix Project model
        project_count = 0
        for project in Project.objects.all():
            changed = False

            # Fix skills field
            if project.skills:
                try:
                    # Try to parse as JSON
                    skills_data = json.loads(project.skills)
                    if isinstance(skills_data, list) and len(skills_data) > 0:
                        # If it's a list with a single string, extract it
                        if len(skills_data) == 1 and isinstance(skills_data[0], str):
                            project.skills = skills_data[0]
                            changed = True
                        # If it's a proper array, join with semicolons
                        elif all(isinstance(s, str) for s in skills_data):
                            project.skills = ";".join(skills_data)
                            changed = True
                except (json.JSONDecodeError, TypeError):
                    # Already plain text, skip
                    pass

            # Fix links field
            if project.links:
                try:
                    # Try to parse as JSON
                    links_data = json.loads(project.links)
                    if isinstance(links_data, dict):
                        # Convert empty dict to empty string
                        if not links_data:
                            project.links = ""
                            changed = True
                        else:
                            # Keep dict as JSON string for now
                            # Or convert to some text format if needed
                            pass
                except (json.JSONDecodeError, TypeError):
                    # Already plain text, skip
                    pass

            if changed:
                project.save()
                project_count += 1
                self.stdout.write(f"Fixed project: {project.title}")

        # Fix Information model
        info_count = 0
        for info in Information.objects.all():
            changed = False

            # Fix skills field
            if info.skills:
                try:
                    skills_data = json.loads(info.skills)
                    if isinstance(skills_data, list) and len(skills_data) > 0:
                        if len(skills_data) == 1 and isinstance(skills_data[0], str):
                            info.skills = skills_data[0]
                            changed = True
                        elif all(isinstance(s, str) for s in skills_data):
                            info.skills = ";".join(skills_data)
                            changed = True
                except (json.JSONDecodeError, TypeError):
                    pass

            # Fix links field
            if info.links:
                try:
                    links_data = json.loads(info.links)
                    if isinstance(links_data, dict):
                        if not links_data:
                            info.links = ""
                            changed = True
                except (json.JSONDecodeError, TypeError):
                    pass

            if changed:
                info.save()
                info_count += 1
                self.stdout.write(f"Fixed information: {info.first_name}")

        self.stdout.write(
            self.style.SUCCESS(
                f"\nSuccessfully converted {project_count} projects and {info_count} information records"
            )
        )
