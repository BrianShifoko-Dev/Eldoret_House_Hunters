"""
Validation Utilities
Email domain validation and other validation functions
"""

import re
from typing import Optional

# Allowed email domain
ALLOWED_EMAIL_DOMAIN = "@eldorethousehunters.co.ke"


def validate_email_domain(email: str) -> bool:
    """
    Validate that email ends with the allowed domain.
    
    Args:
        email: Email address to validate
        
    Returns:
        True if email domain is valid, False otherwise
    """
    if not email or not isinstance(email, str):
        return False
    
    email = email.strip().lower()
    return email.endswith(ALLOWED_EMAIL_DOMAIN.lower())


def validate_email_format(email: str) -> bool:
    """
    Validate email format using regex.
    
    Args:
        email: Email address to validate
        
    Returns:
        True if email format is valid, False otherwise
    """
    if not email or not isinstance(email, str):
        return False
    
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def validate_email(email: str) -> tuple[bool, Optional[str]]:
    """
    Complete email validation (format + domain).
    
    Args:
        email: Email address to validate
        
    Returns:
        Tuple of (is_valid, error_message)
    """
    if not email:
        return False, "Email is required"
    
    email = email.strip()
    
    # Check format
    if not validate_email_format(email):
        return False, "Invalid email format"
    
    # Check domain
    if not validate_email_domain(email):
        return (
            False,
            f"Email must be from {ALLOWED_EMAIL_DOMAIN} domain. Only @eldorethousehunters.co.ke emails are allowed."
        )
    
    return True, None


def sanitize_email(email: str) -> str:
    """
    Sanitize email by trimming and converting to lowercase.
    
    Args:
        email: Email address to sanitize
        
    Returns:
        Sanitized email address
    """
    if not email:
        return ""
    
    return email.strip().lower()


def get_email_domain_error_message() -> str:
    """
    Get standard error message for email domain validation.
    
    Returns:
        Error message string
    """
    return f"Only email addresses from {ALLOWED_EMAIL_DOMAIN} are allowed. Please use an @eldorethousehunters.co.ke email address."

