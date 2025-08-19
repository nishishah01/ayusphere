from django.contrib import admin
from .models import Doctor


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ['doctor_id', 'user', 'specialization', 'experience', 'status', 'created_at']
    list_filter = ['specialization', 'status', 'created_at']
    search_fields = ['doctor_id', 'user__username', 'user__email', 'user__first_name', 'user__last_name']
    readonly_fields = ['doctor_id', 'created_at', 'updated_at']
    actions = ['approve_doctors', 'reject_doctors']

    def approve_doctors(self, request, queryset):
        queryset.update(status='approved')
    approve_doctors.short_description = "Approve selected doctors"

    def reject_doctors(self, request, queryset):
        queryset.update(status='rejected')
    reject_doctors.short_description = "Reject selected doctors"