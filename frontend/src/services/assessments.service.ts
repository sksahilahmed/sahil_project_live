import { apiClient } from './api.client';
import { Assessment } from '../types';

export interface CreateReadingAssessmentDto {
  studentId: string;
  date: string;
  resultBand: 'BEGINNER' | 'LETTER' | 'WORD' | 'PARAGRAPH' | 'STORY';
  wpm?: number;
}

export interface CreateMathAssessmentDto {
  studentId: string;
  date: string;
  resultBand: 'BEGINNER' | 'NUMBER_RECOGNITION' | 'ADDITION' | 'SUBTRACTION' | 'MULTIPLICATION' | 'DIVISION';
  score?: number;
}

export interface TaRLGroup {
  band: string;
  students: Array<{ id: string; name: string; roll: number }>;
}

export interface HeatmapData {
  studentId: string;
  studentName: string;
  roll: number;
  readingBands: Array<{ date: string; band: string }>;
  mathBands: Array<{ date: string; band: string }>;
}

export const assessmentsService = {
  getAll: async (classId?: string, studentId?: string, type?: 'READING' | 'ARITHMETIC'): Promise<Assessment[]> => {
    const params = new URLSearchParams();
    if (classId) params.append('classId', classId);
    if (studentId) params.append('studentId', studentId);
    if (type) params.append('type', type);
    const url = params.toString() ? `/assessments?${params}` : '/assessments';
    const response = await apiClient.get<Assessment[]>(url);
    return response.data;
  },

  getById: async (id: string): Promise<Assessment> => {
    const response = await apiClient.get<Assessment>(`/assessments/${id}`);
    return response.data;
  },

  createReading: async (data: CreateReadingAssessmentDto): Promise<Assessment> => {
    const response = await apiClient.post<Assessment>('/assessments/reading', data);
    return response.data;
  },

  createMath: async (data: CreateMathAssessmentDto): Promise<Assessment> => {
    const response = await apiClient.post<Assessment>('/assessments/math', data);
    return response.data;
  },

  getGrouping: async (classId: string, type: 'READING' | 'ARITHMETIC'): Promise<TaRLGroup[]> => {
    const response = await apiClient.get<TaRLGroup[]>(`/assessments/grouping/${classId}?type=${type}`);
    return response.data;
  },

  getHeatmap: async (classId: string): Promise<HeatmapData[]> => {
    const response = await apiClient.get<HeatmapData[]>(`/assessments/heatmap/${classId}`);
    return response.data;
  },
};

