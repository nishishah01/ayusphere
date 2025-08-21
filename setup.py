#!/usr/bin/env python3
"""
AyuSphere Setup Script
This script sets up the entire AyuSphere application (frontend + backend)
"""

import os
import sys
import subprocess
import platform

def run_command(command, cwd=None):
    """Run a command and return the result"""
    try:
        result = subprocess.run(command, shell=True, cwd=cwd, capture_output=True, text=True)
        if result.returncode != 0:
            print(f"Error running command: {command}")
            print(f"Error: {result.stderr}")
            return False
        print(result.stdout)
        return True
    except Exception as e:
        print(f"Exception running command {command}: {e}")
        return False

def setup_backend():
    """Setup Django backend"""
    print("=" * 50)
    print("Setting up Django Backend...")
    print("=" * 50)
    
    backend_dir = "backend"
    
    # Install Python dependencies
    print("Installing Python dependencies...")
    if not run_command("pip install -r requirements.txt", cwd=backend_dir):
        print("Failed to install Python dependencies")
        return False
    
    # Make migrations
    print("Creating database migrations...")
    if not run_command("python manage.py makemigrations", cwd=backend_dir):
        print("Failed to create migrations")
        return False
    
    # Run migrations
    print("Running database migrations...")
    if not run_command("python manage.py migrate", cwd=backend_dir):
        print("Failed to run migrations")
        return False
    
    # Create admin user
    print("Creating admin user...")
    if not run_command("python create_admin.py", cwd=backend_dir):
        print("Failed to create admin user")
        return False
    
    print("✅ Backend setup completed successfully!")
    return True

def setup_frontend():
    """Setup React frontend"""
    print("=" * 50)
    print("Setting up React Frontend...")
    print("=" * 50)
    
    # Install Node.js dependencies
    print("Installing Node.js dependencies...")
    if not run_command("npm install"):
        print("Failed to install Node.js dependencies")
        return False
    
    print("✅ Frontend setup completed successfully!")
    return True

def main():
    """Main setup function"""
    print("🚀 Welcome to AyuSphere Setup!")
    print("This will set up both the frontend and backend for you.")
    print()
    
    # Check if we're in the right directory
    if not os.path.exists("backend") or not os.path.exists("src"):
        print("❌ Error: Please run this script from the project root directory")
        sys.exit(1)
    
    # Setup backend
    if not setup_backend():
        print("❌ Backend setup failed!")
        sys.exit(1)
    
    # Setup frontend
    if not setup_frontend():
        print("❌ Frontend setup failed!")
        sys.exit(1)
    
    print()
    print("🎉 Setup completed successfully!")
    print()
    print("To start the application:")
    print("1. Start the backend: ./start-backend.sh")
    print("2. Start the frontend: npm run dev")
    print()
    print("Admin Panel: http://localhost:8000/admin/")
    print("Frontend: http://localhost:8080/")
    print()
    print("Admin Credentials:")
    print("  Username: admin")
    print("  Password: admin123")

if __name__ == "__main__":
    main()