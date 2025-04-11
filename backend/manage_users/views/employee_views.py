import uuid

from rest_framework import status
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from ..models import Employee
from ..serializer import EmployeeSerializer


class EmployeeListView(APIView):
    def get(self, request):
        query_response = Employee.objects.all()
        serializer = EmployeeSerializer(query_response, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class EmployeeManagementView(APIView):
    @staticmethod
    def handle_500_error(func):
        def wrapper(self, request, *args, **kwargs):
            try:
                return func(self, request, *args, **kwargs)
            except Exception as e:
                print(f"Error: {e}")
                return Response({"error": "An unexpected error occurred. Please try again later."},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return wrapper

    @handle_500_error
    def get(self, request, id:uuid):
        employee = get_object_or_404(Employee, id=id)
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @handle_500_error
    def put(self, request, id:uuid):
        employee = get_object_or_404(Employee, id=id)
        serializer = EmployeeSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    @handle_500_error
    def delete(self, request, id:uuid):
        employee = get_object_or_404(Employee, id=id)
        employee.delete()
        return Response({"message": "Employee deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
