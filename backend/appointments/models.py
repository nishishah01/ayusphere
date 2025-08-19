from django.db import models
from django.conf import settings
from patients.models import Patient
from doctors.models import Doctor


class Appointment(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('no_show', 'No Show'),
    ]
    
    appointment_id = models.CharField(max_length=20, unique=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='appointments')
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    duration = models.PositiveIntegerField(default=30, help_text="Duration in minutes")
    reason = models.TextField()
    symptoms = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='scheduled')
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['doctor', 'appointment_date', 'appointment_time']
        ordering = ['-appointment_date', '-appointment_time']

    def __str__(self):
        return f"Appointment {self.appointment_id}: {self.patient.user.get_full_name()} with Dr. {self.doctor.user.get_full_name()}"

    def save(self, *args, **kwargs):
        if not self.appointment_id:
            # Generate appointment ID
            last_appointment = Appointment.objects.order_by('-id').first()
            if last_appointment:
                last_id = int(last_appointment.appointment_id.split('A')[1])
                self.appointment_id = f"A{last_id + 1:06d}"
            else:
                self.appointment_id = "A000001"
        super().save(*args, **kwargs)