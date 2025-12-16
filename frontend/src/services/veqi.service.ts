import { apiClient } from './api.client';

export interface VEQI {
  id: string;
  schoolId: string;
  quarter: string; // "2024-Q1"
  componentScores: {
    teaching: number;
    assessments: number;
    compliance: number;
    engagement: number;
  };
  totalScore: number;
  planActions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CalculateVEQIDto {
  schoolId: string;
  quarter: string;
}

export const veqiService = {
  calculate: async (data: CalculateVEQIDto): Promise<VEQI> => {
    const response = await apiClient.post<VEQI>('/veqi/calculate', data);
    return response.data;
  },

  getAll: async (schoolId: string): Promise<VEQI[]> => {
    const response = await apiClient.get<VEQI[]>(`/veqi?schoolId=${schoolId}`);
    return response.data;
  },

  getById: async (id: string): Promise<VEQI> => {
    const response = await apiClient.get<VEQI>(`/veqi/${id}`);
    return response.data;
  },
};

