from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import MedicalRecord
from .serializers import MedicalRecordSerializer, MedicalRecordCreateSerializer


class MedicalRecordListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return MedicalRecordCreateSerializer
        return MedicalRecordSerializer

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return MedicalRecord.objects.filter(patient__user=user)
        elif user.user_type == 'doctor':
            return MedicalRecord.objects.filter(doctor__user=user)
        return MedicalRecord.objects.all()


class MedicalRecordDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MedicalRecordSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return MedicalRecord.objects.filter(patient__user=user)
        elif user.user_type == 'doctor':
            return MedicalRecord.objects.filter(doctor__user=user)
        return MedicalRecord.objects.all()