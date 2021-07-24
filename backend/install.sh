#!/usr/bin/env bash

pip install django
pip install djangorestframework
python manage.py migrate
python manage.py createsuperuser
