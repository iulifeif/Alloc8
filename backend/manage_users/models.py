import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

NORMAL_USER = "user"
ADMIN_USER = "admin"
MANAGER_USER = "manager"

USER_ROLE_CHOICES = [
    (ADMIN_USER, 'Admin'),
    (MANAGER_USER, 'Manager'),
    (NORMAL_USER, 'User'),
]


class Employee(AbstractUser):
    """Represents a user in the system"""
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    role = models.CharField(max_length=15, default=NORMAL_USER, choices=USER_ROLE_CHOICES)
    skills = models.ManyToManyField('Skill', blank=True, related_name='employee_skills')
    goals = models.ManyToManyField('Goal', blank=True, related_name='employee_goals')

    # USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "role", "password"]

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.email}"

    def save(self, *args, **kargs):
        self.username = (str(self.email).split('@'))[0]
        if not self.pk or not self.password.startswith('pbkdf2_'):
            self.set_password(self.password)
        super().save(*args, **kargs)

    class Meta:
        db_table = "employee"


class Skill(models.Model):
    """Represents a skill that can be assigned to multiple users"""
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "skill"


class Goal(models.Model):
    """Represents a learning or career goal that can be assigned to multiple users"""
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.name

    class Meta:
        db_table = "goal"


class Project(models.Model):
    """Represents a project to which users can be alloc8ed"""
    name = models.CharField(max_length=100, unique=True)
    employees = models.ManyToManyField(Employee, blank=True, related_name='projects')

    def __str__(self):
        return self.name

    class Meta:
        db_table = "project"


class Position(models.Model):
    """Represents a position within a project with specific requirements"""
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="position_for_project")
    name = models.CharField(max_length=255)
    description = models.TextField()
    responsibilities = models.TextField()
    skills = models.ManyToManyField(Skill, blank=True, related_name='position_skills')
    technical_background = models.TextField()
    nice_to_have = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "position"
