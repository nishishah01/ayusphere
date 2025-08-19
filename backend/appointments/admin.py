from django.contrib import admin
from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['appointment_id', 'patient', 'doctor', 'appointment_date', 
                   'appointment_time', 'status', 'created_at']
    list_filter = ['status', 'appointment_date', 'created_at']
    search_fields = ['appointment_id', 'patient__user__username', 'doctor__user__username']
    readonly_fields = ['appointment_id', 'created_at', 'updated_at']
    date_hierarchy = 'appointment_date'