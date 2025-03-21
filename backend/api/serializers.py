from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Job

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        # Remove 'is_employer' and 'is_worker' unless they exist in the model

class JobSerializer(serializers.ModelSerializer):
    employer = UserSerializer(read_only=True)  # For GET requests (read-only)
    employer_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='employer', write_only=True)

    class Meta:
        model = Job
        fields = '__all__'
