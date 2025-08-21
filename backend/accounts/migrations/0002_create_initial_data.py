# Generated migration for initial data setup

from django.db import migrations
from django.contrib.auth import get_user_model

def create_initial_data(apps, schema_editor):
    User = get_user_model()
    
    # Create admin user if it doesn't exist
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='admin123',
            first_name='Admin',
            last_name='User',
            user_type='admin'
        )

def reverse_initial_data(apps, schema_editor):
    User = get_user_model()
    User.objects.filter(username='admin').delete()

class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_initial_data, reverse_initial_data),
    ]