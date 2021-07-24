from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import User, Job, Note
from .serializers import UserSerializer, JobSerializer, NoteSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer

    @action(methods=['get'], detail=True)
    def jobs(self, request, pk=None):
        user = self.get_object()
        jobs = Job.objects.filter(user=user)
        context = {
            'request': request
        }
        serializer = JobSerializer(jobs, many=True, context=context)
        return Response(serializer.data)


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by('company')
    serializer_class = JobSerializer

    @action(methods=['get'], detail=True)
    def notes(self, request, pk=None):
        job = self.get_object()
        notes = Note.objects.filter(job=job)
        context = {
            'request': request
        }
        serializer = NoteSerializer(notes, many=True, context=context)
        return Response(serializer.data)


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all().order_by('date')
    serializer_class = NoteSerializer
