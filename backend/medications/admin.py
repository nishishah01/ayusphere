from django.contrib import admin
from .models import Medication, MedicationReminder


@admin.register(Medication)
class MedicationAdmin(admin.ModelAdmin):
    list_display = ['medication_id', 'name', 'patient', 'prescribed_by', 'frequency', 'status', 'created_at']
    list_filter = ['frequency', 'status', 'created_at']
    search_fields = ['medication_id', 'name', 'patient__user__username']
    readonly_fields = ['medication_id', 'created_at', 'updated_at']


@admin.register(MedicationReminder)
class MedicationReminderAdmin(admin.ModelAdmin):
    list_display = ['medication', 'reminder_time', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']