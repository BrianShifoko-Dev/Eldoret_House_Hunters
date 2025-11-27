"""
Create Admin User Script
Utility script to create a new admin user from command line
"""

import sys
import os
from getpass import getpass

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models.admin import Admin, AdminRole
from app.utils.auth import get_password_hash


def create_admin():
    """
    Interactive script to create a new admin user
    """
    print("=" * 50)
    print("🔐 Eldoret House Hunters - Create Admin User")
    print("=" * 50)
    print()
    
    # Get admin details
    username = input("Enter username: ").strip()
    if not username:
        print("❌ Username cannot be empty")
        return
    
    email = input("Enter email: ").strip()
    if not email:
        print("❌ Email cannot be empty")
        return
    
    password = getpass("Enter password (min 8 chars): ")
    if len(password) < 8:
        print("❌ Password must be at least 8 characters")
        return
    
    confirm_password = getpass("Confirm password: ")
    if password != confirm_password:
        print("❌ Passwords do not match")
        return
    
    print("\nSelect role:")
    print("1. Super Admin (full access)")
    print("2. Admin (manage properties)")
    print("3. Editor (create/edit only)")
    
    role_choice = input("Enter choice (1-3): ").strip()
    role_map = {
        "1": AdminRole.SUPER_ADMIN,
        "2": AdminRole.ADMIN,
        "3": AdminRole.EDITOR
    }
    
    role = role_map.get(role_choice, AdminRole.EDITOR)
    
    # Create database session
    db = SessionLocal()
    
    try:
        # Check if username exists
        existing_user = db.query(Admin).filter(Admin.username == username).first()
        if existing_user:
            print(f"❌ Username '{username}' already exists")
            return
        
        # Check if email exists
        existing_email = db.query(Admin).filter(Admin.email == email).first()
        if existing_email:
            print(f"❌ Email '{email}' already exists")
            return
        
        # Create new admin
        new_admin = Admin(
            username=username,
            email=email,
            password_hash=get_password_hash(password),
            role=role
        )
        
        db.add(new_admin)
        db.commit()
        db.refresh(new_admin)
        
        print()
        print("=" * 50)
        print("✅ Admin user created successfully!")
        print("=" * 50)
        print(f"Username: {new_admin.username}")
        print(f"Email: {new_admin.email}")
        print(f"Role: {new_admin.role.value}")
        print(f"ID: {new_admin.id}")
        print("=" * 50)
        
    except Exception as e:
        print(f"❌ Error creating admin: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    try:
        create_admin()
    except KeyboardInterrupt:
        print("\n\n❌ Operation cancelled")
    except Exception as e:
        print(f"\n❌ Error: {e}")

