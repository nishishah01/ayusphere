import api from '@/lib/api';

export interface Patient {
  id: number;
  patient_id: string;
  user: any;
  gender: 'M' | 'F' | 'O';
  blood_type?: string;
  height?: number;
  weight?: number;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  allergies?: string;
  medical_conditions?: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePatientData {
  gender: 'M' | 'F' | 'O';
  blood_type?: string;
  height?: number;
  weight?: number;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  allergies?: string;
  medical_conditions?: string;
}

class PatientService {
  async getPatients(): Promise<Patient[]> {
    const response = await api.get('/patients/');
    return response.data.results || response.data;
  }

  async getPatient(id: number): Promise<Patient> {
    const response = await api.get(`/patients/${id}/`);
    return response.data;
  }

  async createPatient(data: CreatePatientData): Promise<Patient> {
    const response = await api.post('/patients/', data);
    return response.data;
  }

  async updatePatient(id: number, data: Partial<CreatePatientData>): Promise<Patient> {
    const response = await api.patch(`/patients/${id}/`, data);
    return response.data;
  }

  async getMyProfile(): Promise<Patient> {
    const response = await api.get('/patients/my-profile/');
    return response.data;
  }
}

export default new PatientService();