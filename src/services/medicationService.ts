import api from '@/lib/api';

export interface Medication {
  id: number;
  medication_id: string;
  patient: any;
  prescribed_by: any;
  name: string;
  dosage: string;
  frequency: 'daily' | 'twice_daily' | 'three_times_daily' | 'weekly' | 'monthly' | 'as_needed';
  instructions: string;
  start_date: string;
  end_date?: string;
  status: 'active' | 'completed' | 'discontinued';
  side_effects?: string;
  notes?: string;
  reminders: MedicationReminder[];
  created_at: string;
  updated_at: string;
}

export interface MedicationReminder {
  id: number;
  medication: number;
  reminder_time: string;
  is_active: boolean;
  created_at: string;
}

export interface CreateMedicationData {
  patient: number;
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
  start_date: string;
  end_date?: string;
  side_effects?: string;
  notes?: string;
}

class MedicationService {
  async getMedications(): Promise<Medication[]> {
    const response = await api.get('/medications/');
    return response.data.results || response.data;
  }

  async getMedication(id: number): Promise<Medication> {
    const response = await api.get(`/medications/${id}/`);
    return response.data;
  }

  async createMedication(data: CreateMedicationData): Promise<Medication> {
    const response = await api.post('/medications/', data);
    return response.data;
  }

  async updateMedication(id: number, data: Partial<CreateMedicationData>): Promise<Medication> {
    const response = await api.patch(`/medications/${id}/`, data);
    return response.data;
  }

  async deleteMedication(id: number): Promise<void> {
    await api.delete(`/medications/${id}/`);
  }

  async getActiveMedications(): Promise<Medication[]> {
    const response = await api.get('/medications/active/');
    return response.data;
  }

  async getMedicationReminders(): Promise<MedicationReminder[]> {
    const response = await api.get('/medications/reminders/');
    return response.data.results || response.data;
  }

  async createMedicationReminder(data: { medication: number; reminder_time: string }): Promise<MedicationReminder> {
    const response = await api.post('/medications/reminders/', data);
    return response.data;
  }
}

export default new MedicationService();