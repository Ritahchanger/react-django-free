from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser


from django.db import models


class User(AbstractUser):

    is_employer = models.BooleanField(default=False)

    is_worker = models.BigIntegerField(default=False)


class Job(models.Model):

    title = models.CharField(max_length=255)

    description = models.TextField()

    employer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posted_jobs")


    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="assigned_jobs")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title