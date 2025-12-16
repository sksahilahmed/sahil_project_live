import { apiClient } from './api.client';
import { Student } from '../types';

export interface CreateStudentDto {
  schoolId: string;
  classId: string;
  roll: number;
  name: string;
  readingBand?: string;
  mathBand?: string;
}

export interface BulkCreateStudentDto {
  schoolId: string;
  classId: string;
  students: Omit<CreateStudentDto, 'schoolId' | 'classId'>[];
}

export interface UpdateStudentDto {
  roll?: number;
  name?: string;
  readingBand?: string;
  mathBand?: string;
  active?: boolean;
}

export const studentsService = {
  getAll: async (classId?: string, schoolId?: string): Promise<Student[]> => {
    const params = new URLSearchParams();
    if (classId) params.append('classId', classId);
    if (schoolId) params.append('schoolId', schoolId);
    const url = params.toString() ? `/students?${params}` : '/students';
    const response = await apiClient.get<Student[]>(url);
    return response.data;
  },

  getById: async (id: string): Promise<Student> => {
    const response = await apiClient.get<Student>(`/students/${id}`);
    return response.data;
  },

  create: async (data: CreateStudentDto): Promise<Student> => {
    const response = await apiClient.post<Student>('/students', data);
    return response.data;
  },

  bulkCreate: async (data: BulkCreateStudentDto): Promise<Student[]> => {
    const response = await apiClient.post<Student[]>('/students/bulk', data);
    return response.data;
  },

  importFromCSV: async (classId: string, file: File): Promise<Student[]> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post<Student[]>(
      `/classes/${classId}/students/import`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  update: async (id: string, data: UpdateStudentDto): Promise<Student> => {
    const response = await apiClient.patch<Student>(`/students/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/students/${id}`);
  },
};

