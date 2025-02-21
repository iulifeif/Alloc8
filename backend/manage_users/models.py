import uuid

from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, AbstractUser
from django.db import models

NORMAL_USER = "user"
ADMIN_USER = "admin"
MANAGER_USER = "manager"

USER_ROLE_CHOICES = [
    (ADMIN_USER, 'Admin'),
    (MANAGER_USER, 'Manager'),
    (NORMAL_USER, 'User'),
]


class UserManager(BaseUserManager):
    def create_user(self, credentials):
        if not credentials["email"]:
            raise ValueError('User must have an email address')
        email = self.normalize_email(credentials["email"])
        user = self.model(role=credentials.get("role", None),
                          email=email,
                          first_name=credentials["first_name"],
                          last_name=credentials["last_name"],
                          password=credentials["password"])
        user.set_password(credentials["password"])
        user.save(usinng=self._db)
        return user

    def create_superuser(self, credentials):
        user = self.create_user(credentials)
        user.role = ADMIN_USER
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractUser, PermissionsMixin):
    """Represents a user in the system"""
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=15, default=NORMAL_USER, choices=USER_ROLE_CHOICES)
    skills = models.ManyToManyField('Skill', blank=True, related_name='users_skills')
    goals = models.ManyToManyField('Goal', blank=True, related_name='users_goals')

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.email}"


class Skill(models.Model):
    """Represents a skill that can be assigned to multiple users"""
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Goal(models.Model):
    """Represents a learning or career goal that can be assigned to multiple users"""
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Project(models.Model):
    """Represents a project to which users can be alloc8ed"""
    name = models.CharField(max_length=100)
    employees = models.ManyToManyField(User, blank=True, related_name='projects')

    def __str__(self):
        return self.name


class Position(models.Model):
    """Represents a position within a project with specific requirements"""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="position_for_project")
    name = models.CharField(max_length=255)
    description = models.TextField()
    responsibilities = models.TextField()
    skills = models.ManyToManyField(Skill, blank=True, related_name='position_skills')
    technical_background = models.TextField()
    nice_to_have = models.TextField(blank=True)

    def __str__(self):
        return self.name
