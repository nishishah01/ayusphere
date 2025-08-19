from django.urls import path
from . import views

urlpatterns = [
    path('metrics/', views.HealthMetricListCreateView.as_view(), name='health-metric-list-create'),
    path('metrics/<int:pk>/', views.HealthMetricDetailView.as_view(), name='health-metric-detail'),
    path('vitals/', views.VitalSignsListCreateView.as_view(), name='vital-signs-list-create'),
    path('overview/', views.health_overview, name='health-overview'),
]