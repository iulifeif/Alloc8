from django.contrib import admin
from django.urls import path
from . import views
from .views import ReactView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', ReactView.as_view(), name='User class'),
]
