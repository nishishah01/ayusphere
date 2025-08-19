from django.db import models
from django.conf import settings


class Doctor(models.Model):
    SPECIALIZATION_CHOICES = [
        ('cardiology', 'Cardiology'),
        ('dermatology', 'Dermatology'),
        ('endocrinology', 'Endocrinology'),
        ('gastroenterology', 'Gastroenterology'),
        ('neurology', 'Neurology'),
        ('oncology', 'Oncology'),
        ('orthopedics', 'Orthopedics'),
        ('pediatrics', 'Pediatrics'),
        ('psychiatry', 'Psychiatry'),
        ('radiology', 'Radiology'),
        ('surgery', 'Surgery'),
        ('urology', 'Urology'),
        ('other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    doctor_id = models.CharField(max_length=20, unique=True)
    specialization = models.CharField(max_length=20, choices=SPECIALIZATION_CHOICES)
    qualifications = models.TextField()
    experience = models.PositiveIntegerField(help_text="Years of experience")
    license_number = models.CharField(max_length=50, unique=True)
    clinic_address = models.TextField()
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    availability = models.JSONField(default=list, help_text="Available days")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Dr. {self.user.get_full_name()} ({self.specialization})"

    def save(self, *args, **kwargs):
        if not self.doctor_id:
            # Generate doctor ID
            last_doctor = Doctor.objects.order_by('-id').first()
            if last_doctor:
                last_id = int(last_doctor.doctor_id.split('D')[1])
                self.doctor_id = f"D{last_id + 1:06d}"
            else:
                self.doctor_id = "D000001"
        super().save(*args, **kwargs)