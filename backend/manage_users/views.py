from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Employee
from .serializer import EmployeeSerializer


class UsersView(APIView):
    serializer_class = EmployeeSerializer

    def get(self, request, *args, **kwargs):
        users = Employee.objects.all()
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data)


class LogInView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user:
            return Response({"message": f"Hello, {user.username}!"}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class RegisterView(APIView):
    def post(self, request):
        firstname = request.data.get("firstname", None)
        lastname = request.data.get("lastname", None)
        email = request.data.get("email", None)
        password = request.data.get("password", None)

        user = Employee(first_name=firstname, last_name=lastname, email=email, password=password)
        user.save()
        return Response(status= status.HTTP_200_OK)
