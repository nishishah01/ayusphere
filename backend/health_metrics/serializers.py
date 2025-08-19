from rest_framework import serializers
from patients.serializers import PatientSerializer
from .models import HealthMetric, VitalSigns


class HealthMetricSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    
    class Meta:
        model = HealthMetric
        fields = '__all__'
        read_only_fields = ['created_at']


class HealthMetricCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthMetric
        fields = ['metric_type', 'value', 'unit', 'notes', 'recorded_at']

    def create(self, validated_data):
        # Get patient from user
        from patients.models import Patient
        patient = Patient.objects.get(user=self.context['request'].user)
        validated_data['patient'] = patient
        return super().create(validated_data)


class VitalSignsSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    blood_pressure = serializers.ReadOnlyField()
    
    class Meta:
        model = VitalSigns
        fields = '__all__'
        read_only_fields = ['created_at']


class VitalSignsCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = VitalSigns
        fields = ['systolic_bp', 'diastolic_bp', 'heart_rate', 'temperature', 
                 'respiratory_rate', 'oxygen_saturation', 'recorded_at', 'notes']

    def create(self, validated_data):
        # Get patient from user
        from patients.models import Patient
        patient = Patient.objects.get(user=self.context['request'].user)
        validated_data['patient'] = patient
        return super().create(validated_data)