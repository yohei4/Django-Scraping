"""
WSGI config for Personal_development project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

from django.core.wsgi import get_wsgi_application

FILE_PATH = os.path.dirname(__file__)
PROJECT_NAME = os.path.basename(FILE_PATH)

sys.path.append(os.path.dirname(FILE_PATH))
sys.path.append(FILE_PATH)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", PROJECT_NAME + ".settings")

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Personal_development.settings')

application = get_wsgi_application()
