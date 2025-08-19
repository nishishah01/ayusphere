from django.urls import path
from . import views

urlpatterns = [
    path('', views.DoctorListCreateView.as_view(), name='doctor-list-create'),
    path('<int:pk>/', views.DoctorDetailView.as_view(), name='doctor-detail'),
    path('my-profile/', views.my_doctor_profile, name='my-doctor-profile'),
    path('specializations/', views.specializations, name='specializations'),
]