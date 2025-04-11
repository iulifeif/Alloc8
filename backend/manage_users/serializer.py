from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_email
from rest_framework import serializers

from .models import Employee, Goal, Project, Position, Skill


"""Serializers for the models"""
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['first_name', 'last_name', 'email', 'password']
        extra_kwargs = {
            'role': {'required': False},
            'skills': {'required': False},
            'goals': {'required': False},
            'password': {'write_only': True}
        }

    def validate(self, data):
        """
        Validates the provided data to ensure it meets the required structure and
        standards for both email and password. This method checks the email format
        and the strength of the password. If these validations pass, the data is
        returned as is.

        Arguments:
            data (dict): A dictionary containing the keys "email" and "password"
            representing the user-provided data to validate.

        Returns:
            dict: The same data dictionary if all validations are successful.
        """
        validate_email(data.get("email")) # Validate email structure
        validate_password(data.get("password")) # Validate password strength
        return data

    def create(self, validated_data):
        password = validated_data.pop('password')
        employee = Employee.objects.create(**validated_data, password=password)
        # employee.set_password(password)
        employee.save()
        return employee

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['name']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['name', 'employees']

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ['name', 'description', 'responsibilities', 'skills',
                  'technical_background', 'nice_to_have']
