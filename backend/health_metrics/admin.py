from django.contrib import admin
from .models import HealthMetric, VitalSigns


@admin.register(HealthMetric)
class HealthMetricAdmin(admin.ModelAdmin):
    list_display = ['patient', 'metric_type', 'value', 'unit', 'recorded_at', 'created_at']
    list_filter = ['metric_type', 'recorded_at', 'created_at']
    search_fields = ['patient__user__username', 'metric_type']
    date_hierarchy = 'recorded_at'


@admin.register(VitalSigns)
class VitalSignsAdmin(admin.ModelAdmin):
    list_display = ['patient', 'blood_pressure', 'heart_rate', 'temperature', 'recorded_at']
    list_filter = ['recorded_at', 'created_at']
    search_fields = ['patient__user__username']
    date_hierarchy = 'recorded_at'