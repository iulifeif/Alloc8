from django.contrib import admin
from django.contrib.auth.views import LogoutView
from django.urls import path

from .views.handle_auth_state_views import LogInView, RegisterView
from .views.employee_views import EmployeeListView, EmployeeManagementView

urlpatterns = [
    path('auth/login', LogInView.as_view(), name='login'),
    path('auth/register', RegisterView.as_view(), name='register'),
    path('auth/logout', LogoutView.as_view(), name='logout'),
    path('employees/<uuid:id>', EmployeeManagementView.as_view(), name='employee-detail'),
    path('employees', EmployeeListView.as_view(), name="employee-list"),
    path('admin', admin.site.urls),
    path('', EmployeeListView.as_view(), name="employee-list")
]
