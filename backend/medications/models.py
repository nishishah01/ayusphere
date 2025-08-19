from django.db import models
from patients.models import Patient
from doctors.models import Doctor


class Medication(models.Model):
    FREQUENCY_CHOICES = [
        ('daily', 'Daily'),
        ('twice_daily', 'Twice Daily'),
        ('three_times_daily', 'Three Times Daily'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
        ('as_needed', 'As Needed'),
    ]
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('discontinued', 'Discontinued'),
    ]
    
    medication_id = models.CharField(max_length=20, unique=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='medications')
    prescribed_by = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='prescribed_medications')
    name = models.CharField(max_length=200)
    dosage = models.CharField(max_length=100)
    frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES)
    instructions = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='active')
    side_effects = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.patient.user.get_full_name()}"

    def save(self, *args, **kwargs):
        if not self.medication_id:
            # Generate medication ID
            last_medication = Medication.objects.order_by('-id').first()
            if last_medication:
                last_id = int(last_medication.medication_id.split('M')[1])
                self.medication_id = f"M{last_id + 1:06d}"
            else:
                self.medication_id = "M000001"
        super().save(*args, **kwargs)


class MedicationReminder(models.Model):
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE, related_name='reminders')
    reminder_time = models.TimeField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reminder for {self.medication.name} at {self.reminder_time}"