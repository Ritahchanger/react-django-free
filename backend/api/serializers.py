from rest_framework import serializers

from django.contrib.auth import get_user_model


from .models import Job



User = get_user_model()



class UserSerializer(serializers.ModelSerializer):

    class Meta:

        model = User

        fields = ['id','username','email','is_employer','is_worker']
    

class JobSerializer(serializers.ModelSerializer):

    employer = UserSerializer(read_only=True)

    class Meta:

        model = Job

        fields = '__all__'