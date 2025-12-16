import { apiClient } from './api.client';

export interface ContentItem {
  id: string;
  title: string;
  subject: 'READING' | 'MATH';
  levelTag: string;
  locale: 'en' | 'hi' | 'or';
  bodyMd: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateContentDto {
  title: string;
  subject: 'READING' | 'MATH';
  levelTag: string;
  locale: 'en' | 'hi' | 'or';
  bodyMd: string;
  attachments?: string[];
}

export interface UpdateContentDto {
  title?: string;
  subject?: 'READING' | 'MATH';
  levelTag?: string;
  locale?: 'en' | 'hi' | 'or';
  bodyMd?: string;
  attachments?: string[];
}

export const contentService = {
  getAll: async (subject?: string, levelTag?: string, locale?: string): Promise<ContentItem[]> => {
    const params = new URLSearchParams();
    if (subject) params.append('subject', subject);
    if (levelTag) params.append('levelTag', levelTag);
    if (locale) params.append('locale', locale);
    const url = params.toString() ? `/content?${params}` : '/content';
    const response = await apiClient.get<ContentItem[]>(url);
    return response.data;
  },

  getById: async (id: string): Promise<ContentItem> => {
    const response = await apiClient.get<ContentItem>(`/content/${id}`);
    return response.data;
  },

  create: async (data: CreateContentDto): Promise<ContentItem> => {
    const response = await apiClient.post<ContentItem>('/content', data);
    return response.data;
  },

  update: async (id: string, data: UpdateContentDto): Promise<ContentItem> => {
    const response = await apiClient.patch<ContentItem>(`/content/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/content/${id}`);
  },
};

