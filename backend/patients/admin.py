from django.contrib import admin
from .models import Patient


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ['patient_id', 'user', 'gender', 'blood_type', 'created_at']
    list_filter = ['gender', 'blood_type', 'created_at']
    search_fields = ['patient_id', 'user__username', 'user__email', 'user__first_name', 'user__last_name']
    readonly_fields = ['patient_id', 'created_at', 'updated_at']