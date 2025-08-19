import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ayu_health_sphere.settings')
application = get_asgi_application()