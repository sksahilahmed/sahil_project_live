import { apiClient } from './api.client';
import { Session } from '../types';

export interface CreateSessionDto {
  classId: string;
  date: string;
  activityIds: string[];
  activeMinutes: number;
  notes?: string;
}

export interface UpdateSessionDto {
  activityIds?: string[];
  activeMinutes?: number;
  notes?: string;
}

export interface SessionStats {
  totalSessions: number;
  totalMinutes: number;
  averageMinutes: number;
  sessionsByWeek: Array<{ week: string; count: number; minutes: number }>;
}

export const sessionsService = {
  getAll: async (classId?: string): Promise<Session[]> => {
    const url = classId ? `/sessions?classId=${classId}` : '/sessions';
    const response = await apiClient.get<Session[]>(url);
    return response.data;
  },

  getById: async (id: string): Promise<Session> => {
    const response = await apiClient.get<Session>(`/sessions/${id}`);
    return response.data;
  },

  create: async (data: CreateSessionDto): Promise<Session> => {
    const response = await apiClient.post<Session>('/sessions', data);
    return response.data;
  },

  update: async (id: string, data: UpdateSessionDto): Promise<Session> => {
    const response = await apiClient.patch<Session>(`/sessions/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/sessions/${id}`);
  },

  getStats: async (
    classId: string,
    startDate?: string,
    endDate?: string
  ): Promise<SessionStats> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const url = `/sessions/stats/${classId}${params.toString() ? `?${params}` : ''}`;
    const response = await apiClient.get<SessionStats>(url);
    return response.data;
  },
};

