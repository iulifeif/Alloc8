from django.contrib.auth import authenticate
from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from ..serializer import EmployeeSerializer


class LogInView(APIView):
    def post(self, request):
        try:
            email = request.data.get('email')
            password = request.data.get('password')

            user = authenticate(request, username=email, password=password)
            if user:
                # Create JWT tokens
                # refresh = RefreshToken.for_user(user)
                # return Response({
                #     'access_token': str(refresh.access_token),
                #     'refresh_token': str(refresh)
                # }, status=status.HTTP_200_OK)
                # login(request, user)
                return Response({'message': 'Login Successful'}, status=status.HTTP_200_OK) #testing

            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RegisterView(APIView):
    @csrf_exempt
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

class LogOutView(APIView):
    def post(self, request):
        refresh_token = request.data.get("refresh_token")
        if not refresh_token:
            return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
