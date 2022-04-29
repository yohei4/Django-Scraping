"""
WSGI config for Personal_development project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

# FILE_PATH = os.path.dirname('var/www/html/my-app/Personal_development')
# PROJECT_NAME = os.path.basename('Personal_development')

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + '/..')

# sys.path.append("var/www/html/my-app/Personal_development")
# sys.path.append("var/www/html/my-app/Personal_development/Personal_development")

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", PROJECT_NAME + ".settings")

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Personal_development.settings')

application = get_wsgi_application()
