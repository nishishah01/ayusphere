from rest_framework import serializers
from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'read_at']


class NotificationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['notification_type', 'title', 'message', 'priority', 'action_url', 'metadata']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)