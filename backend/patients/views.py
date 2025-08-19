from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Patient
from .serializers import PatientSerializer, PatientCreateSerializer


class PatientListCreateView(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PatientCreateSerializer
        return PatientSerializer

    def get_queryset(self):
        if self.request.user.user_type == 'patient':
            return Patient.objects.filter(user=self.request.user)
        return Patient.objects.all()


class PatientDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.user_type == 'patient':
            return Patient.objects.filter(user=self.request.user)
        return Patient.objects.all()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_patient_profile(request):
    try:
        patient = Patient.objects.get(user=request.user)
        serializer = PatientSerializer(patient)
        return Response(serializer.data)
    except Patient.DoesNotExist:
        return Response({'error': 'Patient profile not found'}, status=status.HTTP_404_NOT_FOUND)