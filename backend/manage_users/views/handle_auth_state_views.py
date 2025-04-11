from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from ..models import Employee
from ..serializer import EmployeeSerializer


class LogInView(APIView):
    def post(self, request):
        try:
            username = str(request.data.get('email')).split('@')[0]
            password = request.data.get('password')

            here = Employee.objects.filter(username=username).first()
            if here:
                print("AICI: ", password, here.password)

            user = authenticate(request, username=username, password=password)
            print("user", user)
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
            serializer = EmployeeSerializer(data=request.data)

            print(serializer)
            if not serializer.is_valid():
                return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

            employee = serializer.save()
            print(employee, EmployeeSerializer(employee))
            return Response(EmployeeSerializer(employee).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            # rollback
            # rollback_employee = Employee.objects.get(id=employee["id"]):
            #     if rollback_employee:
            #         rollback_employee.delete()
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
