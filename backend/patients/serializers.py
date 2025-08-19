from rest_framework import serializers
from accounts.serializers import UserProfileSerializer
from .models import Patient


class PatientSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = Patient
        fields = '__all__'
        read_only_fields = ['patient_id', 'created_at', 'updated_at']


class PatientCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['gender', 'blood_type', 'height', 'weight', 
                 'emergency_contact_name', 'emergency_contact_phone', 
                 'allergies', 'medical_conditions']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)