#!/usr/bin/env python
import os
import sys
import django
from django.core.management import execute_from_command_line

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ayu_health_sphere.settings')
    
    # Setup Django
    django.setup()
    
    print("Starting AyuSphere Backend Server...")
    print("Admin Panel: http://localhost:8000/admin/")
    print("API Base URL: http://localhost:8000/api/")
    print("Admin Credentials:")
    print("  Username: admin")
    print("  Password: admin123")
    print("-" * 50)
    
    # Run the server
    execute_from_command_line(['manage.py', 'runserver', '8000'])