from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import Job
from .serializers import UserSerializer, JobSerializer
from rest_framework.exceptions import PermissionDenied
User = get_user_model()  # Ensure you use the custom User model

class SignupView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        is_employer = request.data.get('is_employer', False)
        is_worker = request.data.get('is_worker', False)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            username=username, email=email, password=password, 
            is_employer=is_employer, is_worker=is_worker
        )

        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is None:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Login successful", "user": UserSerializer(user).data})

class JobPostView(generics.CreateAPIView):
    serializer_class = JobSerializer

    def create(self, request, *args, **kwargs):
        employer_id = request.data.get("employer_id")

        if not employer_id:
            return Response({"error": "employer_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            employer = User.objects.get(id=employer_id)
        except User.DoesNotExist:
            return Response({"error": "Employer not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(employer=employer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class AvailableJobsView(generics.ListAPIView):
    serializer_class = JobSerializer

    def get(self, request, *args, **kwargs):
        available_jobs = Job.objects.filter(assigned_to=None)
        serializer = self.get_serializer(available_jobs, many=True)
        return Response(serializer.data)


class AcceptJobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, job_id):
        try:
            job = Job.objects.get(id=job_id, assigned_to=None)
            if request.user.is_worker:
                job.assigned_to = request.user  # Fixed typo here
                job.save()
                return Response({"message": "Job accepted successfully"}, status=status.HTTP_200_OK)

            return Response({"error": "Only workers can accept jobs"}, status=status.HTTP_403_FORBIDDEN)
        except Job.DoesNotExist:
            return Response({"error": "Job not found or already assigned"}, status=status.HTTP_404_NOT_FOUND)
