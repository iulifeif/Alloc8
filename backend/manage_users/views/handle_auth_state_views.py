from django.contrib.auth import authenticate, logout
from django.db import transaction
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializer import EmployeeSerializer


class LogInView(APIView):
    """
       API endpoint for logging in a user.
       Requires a CSRF token in the request headers.
    """
    def post(self, request):
        try:
            print("LOGIN REQUEST: ",request, request.data)
            email = request.data.get('email')
            password = request.data.get('password')

            user = authenticate(request, username=email, password=password)
            print("LOGIN USER: ", user)
            if user:
                # Django creates and sets session automatically after authentication.
                return Response({'message': 'Login Successful'}, status=status.HTTP_200_OK)

            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RegisterView(APIView):
    """
        API endpoint for registering an employee.
        Requires a CSRF token in the request headers.
    """
    def post(self, request):
        try:
            print("REQUEST: ",request, request.data)
            with transaction.atomic(): # Strat a database transaction for rollback in error cases
                serializer = EmployeeSerializer(data=request.data)

                print("REGISTRATION START: ",serializer)
                # Validate data first
                if not serializer.is_valid():
                    return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

                # Save the employee
                employee = serializer.save()

                print("REGISTRATION FINAL: ", EmployeeSerializer(employee).data)
                return Response(EmployeeSerializer(employee).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def get_csrf_token(request):
    """
        Endpoint to provide a CSRF token to the client.
    """
    json_response = JsonResponse({'csrfToken': get_token(request)})
    print(json_response)
    return json_response

class LogOutView(APIView):
    """
        API endpoint for logging out the user.
        Requires a CSRF token in the request headers.
    """
    def post(self, request):
        try:
            logout(request)
            return Response({"message": "Logout successful"},  status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
