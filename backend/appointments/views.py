from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from .models import Appointment
from .serializers import AppointmentSerializer, AppointmentCreateSerializer, AppointmentUpdateSerializer


class AppointmentListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AppointmentCreateSerializer
        return AppointmentSerializer

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return Appointment.objects.filter(patient__user=user)
        elif user.user_type == 'doctor':
            return Appointment.objects.filter(doctor__user=user)
        return Appointment.objects.all()


class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return AppointmentUpdateSerializer
        return AppointmentSerializer

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return Appointment.objects.filter(patient__user=user)
        elif user.user_type == 'doctor':
            return Appointment.objects.filter(doctor__user=user)
        return Appointment.objects.all()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def upcoming_appointments(request):
    user = request.user
    today = timezone.now().date()
    
    if user.user_type == 'patient':
        appointments = Appointment.objects.filter(
            patient__user=user,
            appointment_date__gte=today,
            status__in=['scheduled', 'confirmed']
        )
    elif user.user_type == 'doctor':
        appointments = Appointment.objects.filter(
            doctor__user=user,
            appointment_date__gte=today,
            status__in=['scheduled', 'confirmed']
        )
    else:
        appointments = Appointment.objects.filter(
            appointment_date__gte=today,
            status__in=['scheduled', 'confirmed']
        )
    
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def past_appointments(request):
    user = request.user
    today = timezone.now().date()
    
    if user.user_type == 'patient':
        appointments = Appointment.objects.filter(
            patient__user=user,
            appointment_date__lt=today
        )
    elif user.user_type == 'doctor':
        appointments = Appointment.objects.filter(
            doctor__user=user,
            appointment_date__lt=today
        )
    else:
        appointments = Appointment.objects.filter(appointment_date__lt=today)
    
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)