from django.contrib import admin
from .models import User, Job, Note

admin.site.register(User)
admin.site.register(Job)
admin.site.register(Note)
