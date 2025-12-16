import { apiClient } from './api.client';

export interface Compliance {
  id: string;
  schoolId: string;
  type: 'POSHAN' | 'SANITATION' | 'MHM' | 'INSPECTION';
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'ISSUE';
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateComplianceDto {
  schoolId: string;
  type: 'POSHAN' | 'SANITATION' | 'MHM' | 'INSPECTION';
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'ISSUE';
  remarks?: string;
}

export interface UpdateComplianceDto {
  status?: 'COMPLETED' | 'PENDING' | 'ISSUE';
  remarks?: string;
}

export const complianceService = {
  getAll: async (schoolId?: string, type?: string): Promise<Compliance[]> => {
    const params = new URLSearchParams();
    if (schoolId) params.append('schoolId', schoolId);
    if (type) params.append('type', type);
    const url = params.toString() ? `/compliance?${params}` : '/compliance';
    const response = await apiClient.get<Compliance[]>(url);
    return response.data;
  },

  getById: async (id: string): Promise<Compliance> => {
    const response = await apiClient.get<Compliance>(`/compliance/${id}`);
    return response.data;
  },

  create: async (data: CreateComplianceDto): Promise<Compliance> => {
    const response = await apiClient.post<Compliance>('/compliance', data);
    return response.data;
  },

  update: async (id: string, data: UpdateComplianceDto): Promise<Compliance> => {
    const response = await apiClient.patch<Compliance>(`/compliance/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/compliance/${id}`);
  },
};

