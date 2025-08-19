from django.urls import path
from . import views

urlpatterns = [
    path('', views.AppointmentListCreateView.as_view(), name='appointment-list-create'),
    path('<int:pk>/', views.AppointmentDetailView.as_view(), name='appointment-detail'),
    path('upcoming/', views.upcoming_appointments, name='upcoming-appointments'),
    path('past/', views.past_appointments, name='past-appointments'),
]