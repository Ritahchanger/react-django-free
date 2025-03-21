from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser


from django.db import models


class User(AbstractUser):

    is_employer = models.BooleanField(default=False)

    is_worker = models.BigIntegerField(default=False)