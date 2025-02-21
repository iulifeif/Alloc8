from django.http import HttpResponse
from rest_framework.views import APIView

from .models import User
from .serializer import UserSerializer


class ReactView(APIView):
    serializer_class = UserSerializer

    def index(request):
        users_list = User.objects.all()
        output = ", ".join([u.first_name for u in users_list])
        return HttpResponse(output)

    def handle_signup(request):
        return HttpResponse("Sign up")

    def login(request, credentials):
        return HttpResponse("Hello %s" % credentials.username)

    def logout(request):
        return HttpResponse("Log out")
