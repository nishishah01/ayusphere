import api from '@/lib/api';

export interface Doctor {
  id: number;
  doctor_id: string;
  user: any;
  specialization: string;
  qualifications: string;
  experience: number;
  license_number: string;
  clinic_address: string;
  consultation_fee: string;
  availability: string[];
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface CreateDoctorData {
  specialization: string;
  qualifications: string;
  experience: number;
  license_number: string;
  clinic_address: string;
  consultation_fee: string;
  availability: string[];
}

class DoctorService {
  async getDoctors(specialization?: string): Promise<Doctor[]> {
    const params = specialization ? { specialization } : {};
    const response = await api.get('/doctors/', { params });
    return response.data.results || response.data;
  }

  async getDoctor(id: number): Promise<Doctor> {
    const response = await api.get(`/doctors/${id}/`);
    return response.data;
  }

  async createDoctor(data: CreateDoctorData): Promise<Doctor> {
    const response = await api.post('/doctors/', data);
    return response.data;
  }

  async updateDoctor(id: number, data: Partial<CreateDoctorData>): Promise<Doctor> {
    const response = await api.patch(`/doctors/${id}/`, data);
    return response.data;
  }

  async getMyProfile(): Promise<Doctor> {
    const response = await api.get('/doctors/my-profile/');
    return response.data;
  }

  async getSpecializations(): Promise<Array<{value: string, label: string}>> {
    const response = await api.get('/doctors/specializations/');
    return response.data;
  }
}

export default new DoctorService();