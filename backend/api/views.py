from django.shortcuts import render


from django.contrib.auth import authenticate

from rest_framework.views import APIView

from rest_framework.response import Response

from rest_framework import status, generics


from rest_framework.permissions import IsAuthenticated



from django.contrib.auth.models import User

from .models import Job

from .serializers import UserSerializer, JobSerializer


class SignupView(APIView):


    def post(self, request):


        username = request.data.get('username')


        email = request.data.get('email')

        password = request.data.get('password')

        is_employer = request.data.get('is_employer',False)

        is_worker = request.data.get('is_worker',False)


        if User.objects.filter(username=username).exists():

            return Response({"error":"Username already taken"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(username=username, email=email, password=password, is_employer=is_employer, is_worker=is_worker)

        return Response({"message:":"User registered successfully"}, status=status.HTTP_201_CREATED)
    


class LoginView(APIView):

    def post(self,request):

        username = request.data.get('username')

        password = request.data.get('password')


        user = authenticate(username=username, password=password)


        if user is None:


            return Response({"error":"invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"message":"Login successful", "user":UserSerializer(user).data})
    


class JobPostView(generics.CreateAPIView):

    serializer_class = JobSerializer

    permission_classes = [IsAuthenticated]



    def perform_create(self,serializer):

         if not self.request.user.is_employer:
             
              return Response({"error": "Only employers can post jobs"}, status=status.HTTP_403_FORBIDDEN)
         
         serializer.save(employer=self.request.user)


class AvailableJobsView(generics.ListAPIView):

    serializer_class = JobSerializer

    def get_queryset(self):

        return Job.objects.filter(assigned_to=None)
    


class AcceptJobView(APIView):

    permission_classes = [IsAuthenticated]


    def post(self,request,job_id):

        try:

            job = Job.objects.get(id=job_id, assigned_to=None)

            if request.user.is_worker:

                job.assigned_to = request.User

                job.save()

                return Response({"message": "Job accepted successfully"},status=status.HTTP_200_OK)
            
            return Response({"error": "Only workers can accept jobs"}, status=status.HTTP_403_FORBIDDEN)
            

        except Job.DoesNotExist:

            return Response({"error":"Job not found or already assigned"},status=status.HTTP_404_NOT_FOUND)