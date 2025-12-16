// Common types for the application

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'TEACHER' | 'HEAD_TEACHER' | 'OFFICER' | 'ADMIN';
  schoolId?: string;
  languagePreference?: 'en' | 'hi' | 'or';
  createdAt: string;
  updatedAt: string;
}

export interface School {
  id: string;
  name: string;
  code: string;
  mediums: string[];
  grades: number[];
  facilitiesFlags: Record<string, boolean>;
  createdAt: string;
  updatedAt: string;
}

export interface Class {
  id: string;
  schoolId: string;
  grade: number;
  section: string;
  teacherId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  schoolId: string;
  classId: string;
  roll: number;
  name: string;
  readingBand?: string;
  mathBand?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  classId: string;
  date: string;
  activityIds: string[];
  activeMinutes: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Assessment {
  id: string;
  studentId: string;
  type: 'READING' | 'ARITHMETIC';
  date: string;
  resultBand: string;
  wpmOrScore?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

