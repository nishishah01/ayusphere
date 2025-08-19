from django.db import models
from patients.models import Patient


class HealthMetric(models.Model):
    METRIC_TYPE_CHOICES = [
        ('blood_pressure', 'Blood Pressure'),
        ('heart_rate', 'Heart Rate'),
        ('weight', 'Weight'),
        ('height', 'Height'),
        ('temperature', 'Temperature'),
        ('blood_sugar', 'Blood Sugar'),
        ('cholesterol', 'Cholesterol'),
        ('oxygen_saturation', 'Oxygen Saturation'),
    ]
    
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='health_metrics')
    metric_type = models.CharField(max_length=20, choices=METRIC_TYPE_CHOICES)
    value = models.CharField(max_length=50)  # Store as string to handle different formats
    unit = models.CharField(max_length=20)
    notes = models.TextField(blank=True, null=True)
    recorded_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-recorded_at']

    def __str__(self):
        return f"{self.patient.user.get_full_name()} - {self.metric_type}: {self.value} {self.unit}"


class VitalSigns(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='vital_signs')
    systolic_bp = models.PositiveIntegerField(help_text="Systolic Blood Pressure")
    diastolic_bp = models.PositiveIntegerField(help_text="Diastolic Blood Pressure")
    heart_rate = models.PositiveIntegerField(help_text="Heart Rate (BPM)")
    temperature = models.DecimalField(max_digits=4, decimal_places=1, help_text="Temperature in Celsius")
    respiratory_rate = models.PositiveIntegerField(help_text="Respiratory Rate (per minute)")
    oxygen_saturation = models.PositiveIntegerField(help_text="Oxygen Saturation (%)")
    recorded_at = models.DateTimeField()
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-recorded_at']

    def __str__(self):
        return f"{self.patient.user.get_full_name()} - Vitals on {self.recorded_at.date()}"

    @property
    def blood_pressure(self):
        return f"{self.systolic_bp}/{self.diastolic_bp}"