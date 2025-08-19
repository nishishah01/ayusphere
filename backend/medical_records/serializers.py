from rest_framework import serializers
from patients.serializers import PatientSerializer
from doctors.serializers import DoctorListSerializer
from .models import MedicalRecord


class MedicalRecordSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    doctor = DoctorListSerializer(read_only=True)
    
    class Meta:
        model = MedicalRecord
        fields = '__all__'
        read_only_fields = ['record_id', 'date_recorded', 'updated_at']


class MedicalRecordCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalRecord
        fields = ['patient', 'appointment', 'record_type', 'title', 
                 'description', 'diagnosis', 'treatment', 'prescription', 'notes']

    def create(self, validated_data):
        # Get doctor from user
        from doctors.models import Doctor
        doctor = Doctor.objects.get(user=self.context['request'].user)
        validated_data['doctor'] = doctor
        return super().create(validated_data)