from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Job

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ("username", "email", "is_employer", "is_worker", "is_staff", "is_superuser")
    list_filter = ("is_employer", "is_worker", "is_staff", "is_superuser")

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ("title", "employer", "assigned_to", "created_at")
    list_filter = ("employer", "assigned_to")
    search_fields = ("title", "description", "employer__username", "assigned_to__username")

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "employer":
            # Only include users that are employers (exclude workers)
            kwargs["queryset"] = User.objects.filter(is_employer=True)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
