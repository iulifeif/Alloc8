from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Goal

class GoalsView(APIView):
    def post(self, request):
        goals = request.data.get("goals")
        for goal in goals:
            if not Goal.objects.filter(name=goal).exists():
                goal = Goal(name=goal)
                goal.save()
        return Response(goals, status=status.HTTP_201_CREATED)
