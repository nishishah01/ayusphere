from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from .models import Medication, MedicationReminder
from .serializers import MedicationSerializer, MedicationCreateSerializer, MedicationReminderSerializer


class MedicationListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return MedicationCreateSerializer
        return MedicationSerializer

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return Medication.objects.filter(patient__user=user)
        elif user.user_type == 'doctor':
            return Medication.objects.filter(prescribed_by__user=user)
        return Medication.objects.all()


class MedicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MedicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return Medication.objects.filter(patient__user=user)
        elif user.user_type == 'doctor':
            return Medication.objects.filter(prescribed_by__user=user)
        return Medication.objects.all()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def active_medications(request):
    user = request.user
    if user.user_type == 'patient':
        medications = Medication.objects.filter(
            patient__user=user,
            status='active'
        )
    elif user.user_type == 'doctor':
        medications = Medication.objects.filter(
            prescribed_by__user=user,
            status='active'
        )
    else:
        medications = Medication.objects.filter(status='active')
    
    serializer = MedicationSerializer(medications, many=True)
    return Response(serializer.data)


class MedicationReminderListCreateView(generics.ListCreateAPIView):
    serializer_class = MedicationReminderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return MedicationReminder.objects.filter(medication__patient__user=user)
        return MedicationReminder.objects.none()