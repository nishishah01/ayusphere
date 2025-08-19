from django.db import models
from patients.models import Patient
from doctors.models import Doctor
from appointments.models import Appointment


class MedicalRecord(models.Model):
    RECORD_TYPE_CHOICES = [
        ('consultation', 'Consultation'),
        ('lab_result', 'Lab Result'),
        ('vaccination', 'Vaccination'),
        ('surgery', 'Surgery'),
        ('allergy', 'Allergy'),
        ('medication', 'Medication'),
        ('other', 'Other'),
    ]
    
    record_id = models.CharField(max_length=20, unique=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='medical_records')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='medical_records')
    appointment = models.ForeignKey(Appointment, on_delete=models.SET_NULL, null=True, blank=True)
    record_type = models.CharField(max_length=15, choices=RECORD_TYPE_CHOICES)
    title = models.CharField(max_length=200)
    description = models.TextField()
    diagnosis = models.TextField(blank=True, null=True)
    treatment = models.TextField(blank=True, null=True)
    prescription = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    attachments = models.JSONField(default=list, help_text="File URLs")
    date_recorded = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date_recorded']

    def __str__(self):
        return f"Record {self.record_id}: {self.title} - {self.patient.user.get_full_name()}"

    def save(self, *args, **kwargs):
        if not self.record_id:
            # Generate record ID
            last_record = MedicalRecord.objects.order_by('-id').first()
            if last_record:
                last_id = int(last_record.record_id.split('R')[1])
                self.record_id = f"R{last_id + 1:06d}"
            else:
                self.record_id = "R000001"
        super().save(*args, **kwargs)