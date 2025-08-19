from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # Authentication
    path('auth/', include('accounts.urls')),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Core modules
    path('patients/', include('patients.urls')),
    path('doctors/', include('doctors.urls')),
    path('appointments/', include('appointments.urls')),
    path('medical-records/', include('medical_records.urls')),
    path('medications/', include('medications.urls')),
    path('health-metrics/', include('health_metrics.urls')),
    path('notifications/', include('notifications.urls')),
]