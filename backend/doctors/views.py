from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Doctor
from .serializers import DoctorSerializer, DoctorCreateSerializer, DoctorListSerializer


class DoctorListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return DoctorCreateSerializer
        return DoctorListSerializer

    def get_queryset(self):
        queryset = Doctor.objects.filter(status='approved')
        specialization = self.request.query_params.get('specialization')
        if specialization:
            queryset = queryset.filter(specialization=specialization)
        return queryset


class DoctorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsAuthenticated]


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_doctor_profile(request):
    try:
        doctor = Doctor.objects.get(user=request.user)
        serializer = DoctorSerializer(doctor)
        return Response(serializer.data)
    except Doctor.DoesNotExist:
        return Response({'error': 'Doctor profile not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def specializations(request):
    return Response([
        {'value': choice[0], 'label': choice[1]} 
        for choice in Doctor.SPECIALIZATION_CHOICES
    ])