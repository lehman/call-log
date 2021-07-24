from django.db import models


class User(models.Model):
    name = models.CharField(max_length=64)
    email = models.CharField(max_length=64)

    def __str__(self):
        return self.name


class Job(models.Model):
    user = models.ForeignKey(User, default=1, on_delete=models.SET_DEFAULT)
    title = models.CharField(max_length=64)
    company = models.CharField(max_length=64)
    interviewer = models.CharField(max_length=64)

    def __str__(self):
        return self.title


class Note(models.Model):
    job = models.ForeignKey(Job, default=1, on_delete=models.SET_DEFAULT)
    text = models.CharField(max_length=256)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.text[:24]
