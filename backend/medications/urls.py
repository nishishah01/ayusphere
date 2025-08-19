from django.urls import path
from . import views

urlpatterns = [
    path('', views.MedicationListCreateView.as_view(), name='medication-list-create'),
    path('<int:pk>/', views.MedicationDetailView.as_view(), name='medication-detail'),
    path('active/', views.active_medications, name='active-medications'),
    path('reminders/', views.MedicationReminderListCreateView.as_view(), name='medication-reminders'),
]