from rest_framework import serializers
from patients.serializers import PatientSerializer
from doctors.serializers import DoctorListSerializer
from .models import Medication, MedicationReminder


class MedicationReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicationReminder
        fields = '__all__'


class MedicationSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    prescribed_by = DoctorListSerializer(read_only=True)
    reminders = MedicationReminderSerializer(many=True, read_only=True)
    
    class Meta:
        model = Medication
        fields = '__all__'
        read_only_fields = ['medication_id', 'created_at', 'updated_at']


class MedicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = ['patient', 'name', 'dosage', 'frequency', 'instructions', 
                 'start_date', 'end_date', 'side_effects', 'notes']

    def create(self, validated_data):
        # Get doctor from user
        from doctors.models import Doctor
        doctor = Doctor.objects.get(user=self.context['request'].user)
        validated_data['prescribed_by'] = doctor
        return super().create(validated_data)