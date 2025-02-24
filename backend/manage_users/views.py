from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Employee
from .serializer import UserSerializer


class UsersView(APIView):
    serializer_class = UserSerializer

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
