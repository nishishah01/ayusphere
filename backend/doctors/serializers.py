from rest_framework import serializers
from accounts.serializers import UserProfileSerializer
from .models import Doctor


class DoctorSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = Doctor
        fields = '__all__'
        read_only_fields = ['doctor_id', 'status', 'created_at', 'updated_at']


class DoctorCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['specialization', 'qualifications', 'experience', 
                 'license_number', 'clinic_address', 'consultation_fee', 'availability']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class DoctorListSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = Doctor
        fields = ['id', 'doctor_id', 'user', 'specialization', 'experience', 
                 'consultation_fee', 'availability', 'status']