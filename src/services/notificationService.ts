import api from '@/lib/api';

export interface Notification {
  id: number;
  notification_type: 'appointment' | 'medication' | 'report' | 'reminder' | 'system';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  is_read: boolean;
  action_url?: string;
  metadata: any;
  created_at: string;
  read_at?: string;
}

export interface CreateNotificationData {
  notification_type: string;
  title: string;
  message: string;
  priority?: string;
  action_url?: string;
  metadata?: any;
}

class NotificationService {
  async getNotifications(): Promise<Notification[]> {
    const response = await api.get('/notifications/');
    return response.data.results || response.data;
  }

  async getNotification(id: number): Promise<Notification> {
    const response = await api.get(`/notifications/${id}/`);
    return response.data;
  }

  async createNotification(data: CreateNotificationData): Promise<Notification> {
    const response = await api.post('/notifications/', data);
    return response.data;
  }

  async markAsRead(id: number): Promise<void> {
    await api.post(`/notifications/${id}/mark-read/`);
  }

  async markAllAsRead(): Promise<void> {
    await api.post('/notifications/mark-all-read/');
  }

  async getUnreadCount(): Promise<number> {
    const response = await api.get('/notifications/unread-count/');
    return response.data.unread_count;
  }

  async getUnreadNotifications(): Promise<Notification[]> {
    const response = await api.get('/notifications/unread/');
    return response.data;
  }
}

export default new NotificationService();