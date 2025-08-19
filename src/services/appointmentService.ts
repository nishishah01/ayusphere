import api from '@/lib/api';

export interface Appointment {
  id: number;
  appointment_id: string;
  patient: any;
  doctor: any;
  appointment_date: string;
  appointment_time: string;
  duration: number;
  reason: string;
  symptoms?: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAppointmentData {
  doctor: number;
  appointment_date: string;
  appointment_time: string;
  duration?: number;
  reason: string;
  symptoms?: string;
}

export interface UpdateAppointmentData {
  status?: string;
  notes?: string;
}

class AppointmentService {
  async getAppointments(): Promise<Appointment[]> {
    const response = await api.get('/appointments/');
    return response.data.results || response.data;
  }

  async getAppointment(id: number): Promise<Appointment> {
    const response = await api.get(`/appointments/${id}/`);
    return response.data;
  }

  async createAppointment(data: CreateAppointmentData): Promise<Appointment> {
    const response = await api.post('/appointments/', data);
    return response.data;
  }

  async updateAppointment(id: number, data: UpdateAppointmentData): Promise<Appointment> {
    const response = await api.patch(`/appointments/${id}/`, data);
    return response.data;
  }

  async deleteAppointment(id: number): Promise<void> {
    await api.delete(`/appointments/${id}/`);
  }

  async getUpcomingAppointments(): Promise<Appointment[]> {
    const response = await api.get('/appointments/upcoming/');
    return response.data;
  }

  async getPastAppointments(): Promise<Appointment[]> {
    const response = await api.get('/appointments/past/');
    return response.data;
  }
}

export default new AppointmentService();