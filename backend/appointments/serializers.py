from rest_framework import serializers
from patients.serializers import PatientSerializer
from doctors.serializers import DoctorListSerializer
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    doctor = DoctorListSerializer(read_only=True)
    
    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ['appointment_id', 'created_at', 'updated_at']


class AppointmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['doctor', 'appointment_date', 'appointment_time', 
                 'duration', 'reason', 'symptoms']

    def create(self, validated_data):
        # Get patient from user
        from patients.models import Patient
        patient = Patient.objects.get(user=self.context['request'].user)
        validated_data['patient'] = patient
        return super().create(validated_data)

    def validate(self, data):
        # Check if doctor is available at the requested time
        existing_appointment = Appointment.objects.filter(
            doctor=data['doctor'],
            appointment_date=data['appointment_date'],
            appointment_time=data['appointment_time'],
            status__in=['scheduled', 'confirmed']
        ).exists()
        
        if existing_appointment:
            raise serializers.ValidationError("Doctor is not available at this time")
        
        return data


class AppointmentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['status', 'notes']