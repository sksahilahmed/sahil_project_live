import { apiClient } from './api.client';
import { Class } from '../types';

export interface CreateClassDto {
  schoolId: string;
  grade: number;
  section: string;
  teacherId?: string;
}

export interface UpdateClassDto {
  grade?: number;
  section?: string;
  teacherId?: string;
}

export const classesService = {
  getAll: async (schoolId?: string): Promise<Class[]> => {
    const url = schoolId ? `/classes?schoolId=${schoolId}` : '/classes';
    const response = await apiClient.get<Class[]>(url);
    return response.data;
  },

  getById: async (id: string): Promise<Class> => {
    const response = await apiClient.get<Class>(`/classes/${id}`);
    return response.data;
  },

  create: async (data: CreateClassDto): Promise<Class> => {
    const response = await apiClient.post<Class>('/classes', data);
    return response.data;
  },

  update: async (id: string, data: UpdateClassDto): Promise<Class> => {
    const response = await apiClient.patch<Class>(`/classes/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/classes/${id}`);
  },
};

