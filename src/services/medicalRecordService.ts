import api from '@/lib/api';

export interface MedicalRecord {
  id: number;
  record_id: string;
  patient: any;
  doctor: any;
  appointment?: any;
  record_type: 'consultation' | 'lab_result' | 'vaccination' | 'surgery' | 'allergy' | 'medication' | 'other';
  title: string;
  description: string;
  diagnosis?: string;
  treatment?: string;
  prescription?: string;
  notes?: string;
  attachments: string[];
  date_recorded: string;
  updated_at: string;
}

export interface CreateMedicalRecordData {
  patient: number;
  appointment?: number;
  record_type: string;
  title: string;
  description: string;
  diagnosis?: string;
  treatment?: string;
  prescription?: string;
  notes?: string;
}

class MedicalRecordService {
  async getMedicalRecords(): Promise<MedicalRecord[]> {
    const response = await api.get('/medical-records/');
    return response.data.results || response.data;
  }

  async getMedicalRecord(id: number): Promise<MedicalRecord> {
    const response = await api.get(`/medical-records/${id}/`);
    return response.data;
  }

  async createMedicalRecord(data: CreateMedicalRecordData): Promise<MedicalRecord> {
    const response = await api.post('/medical-records/', data);
    return response.data;
  }

  async updateMedicalRecord(id: number, data: Partial<CreateMedicalRecordData>): Promise<MedicalRecord> {
    const response = await api.patch(`/medical-records/${id}/`, data);
    return response.data;
  }

  async deleteMedicalRecord(id: number): Promise<void> {
    await api.delete(`/medical-records/${id}/`);
  }
}

export default new MedicalRecordService();