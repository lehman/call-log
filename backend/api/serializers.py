from rest_framework import serializers

from .models import User, Job, Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email')


class JobSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField

    class Meta:
        model = Job
        fields = ('id', 'company', 'title', 'interviewer', 'user', 'user_id')

    def to_representation(self, instance):
        self.fields['user'] = UserSerializer(write_only=True)
        return super(JobSerializer, self).to_representation(instance)


class NoteSerializer(serializers.ModelSerializer):
    job_id = serializers.PrimaryKeyRelatedField

    class Meta:
        model = Note
        fields = ('id', 'text', 'date', 'job', 'job_id')

    def to_representation(self, instance):
        self.fields['job'] = JobSerializer(write_only=True)
        return super(NoteSerializer, self).to_representation(instance)
