from django.urls import path
from . import views

urlpatterns = [
    path('', views.NotificationListCreateView.as_view(), name='notification-list-create'),
    path('<int:pk>/', views.NotificationDetailView.as_view(), name='notification-detail'),
    path('<int:pk>/mark-read/', views.mark_as_read, name='mark-notification-read'),
    path('mark-all-read/', views.mark_all_as_read, name='mark-all-notifications-read'),
    path('unread-count/', views.unread_count, name='unread-notifications-count'),
    path('unread/', views.unread_notifications, name='unread-notifications'),
]