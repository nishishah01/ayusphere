from django.contrib import admin
from .models import MedicalRecord


@admin.register(MedicalRecord)
class MedicalRecordAdmin(admin.ModelAdmin):
    list_display = ['record_id', 'patient', 'doctor', 'record_type', 'title', 'date_recorded']
    list_filter = ['record_type', 'date_recorded']
    search_fields = ['record_id', 'title', 'patient__user__username', 'doctor__user__username']
    readonly_fields = ['record_id', 'date_recorded', 'updated_at']
    date_hierarchy = 'date_recorded'