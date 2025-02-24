from django.contrib import admin
from django.urls import path
from .views import UsersView, LogInView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', UsersView.as_view(), name="users"),
    path('login/', LogInView.as_view(), name='login'),
]
