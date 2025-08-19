from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from .models import HealthMetric, VitalSigns
from .serializers import (
    HealthMetricSerializer, HealthMetricCreateSerializer,
    VitalSignsSerializer, VitalSignsCreateSerializer
)


class HealthMetricListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return HealthMetricCreateSerializer
        return HealthMetricSerializer

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return HealthMetric.objects.filter(patient__user=user)
        elif user.user_type == 'doctor':
            # Doctors can see metrics of their patients
            return HealthMetric.objects.filter(
                patient__appointments__doctor__user=user
            ).distinct()
        return HealthMetric.objects.all()


class HealthMetricDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = HealthMetricSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return HealthMetric.objects.filter(patient__user=user)
        return HealthMetric.objects.all()


class VitalSignsListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return VitalSignsCreateSerializer
        return VitalSignsSerializer

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return VitalSigns.objects.filter(patient__user=user)
        elif user.user_type == 'doctor':
            return VitalSigns.objects.filter(
                patient__appointments__doctor__user=user
            ).distinct()
        return VitalSigns.objects.all()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def health_overview(request):
    user = request.user
    if user.user_type != 'patient':
        return Response({'error': 'Only patients can access health overview'}, status=403)
    
    from patients.models import Patient
    patient = Patient.objects.get(user=user)
    
    # Get recent metrics (last 30 days)
    thirty_days_ago = timezone.now() - timedelta(days=30)
    
    recent_metrics = HealthMetric.objects.filter(
        patient=patient,
        recorded_at__gte=thirty_days_ago
    )
    
    recent_vitals = VitalSigns.objects.filter(
        patient=patient,
        recorded_at__gte=thirty_days_ago
    )
    
    return Response({
        'recent_metrics': HealthMetricSerializer(recent_metrics, many=True).data,
        'recent_vitals': VitalSignsSerializer(recent_vitals, many=True).data,
    })