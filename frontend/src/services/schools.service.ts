import { apiClient } from './api.client';
import { School } from '../types';

export interface CreateSchoolDto {
  name: string;
  code?: string;
  mediums: string[];
  grades: number[];
  facilitiesFlags: Record<string, boolean>;
}

export interface UpdateSchoolDto {
  name?: string;
  mediums?: string[];
  grades?: number[];
  facilitiesFlags?: Record<string, boolean>;
}

export const schoolsService = {
  getAll: async (): Promise<School[]> => {
    const response = await apiClient.get<School[]>('/schools');
    return response.data;
  },

  getById: async (id: string): Promise<School> => {
    const response = await apiClient.get<School>(`/schools/${id}`);
    return response.data;
  },

  create: async (data: CreateSchoolDto): Promise<School> => {
    const response = await apiClient.post<School>('/schools', data);
    return response.data;
  },

  update: async (id: string, data: UpdateSchoolDto): Promise<School> => {
    const response = await apiClient.patch<School>(`/schools/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/schools/${id}`);
  },
};

