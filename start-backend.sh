#!/bin/bash
echo "Setting up AyuSphere Backend..."
echo "Making migrations..."
cd backend
python manage.py makemigrations
echo "Running migrations..."
python manage.py migrate
echo "Creating admin user..."
python create_admin.py
echo "Starting server..."
python manage.py runserver 8000