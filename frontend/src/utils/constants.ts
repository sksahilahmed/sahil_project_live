// Application constants

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';
export const DEFAULT_LOCALE = import.meta.env.VITE_DEFAULT_LOCALE || 'en';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'VSIP';

export const ROLES = {
  TEACHER: 'TEACHER',
  HEAD_TEACHER: 'HEAD_TEACHER',
  OFFICER: 'OFFICER',
  ADMIN: 'ADMIN',
} as const;

export const LANGUAGES = {
  EN: 'en',
  HI: 'hi',
  OR: 'or',
} as const;

export const ASSESSMENT_TYPES = {
  READING: 'READING',
  ARITHMETIC: 'ARITHMETIC',
} as const;

export const READING_BANDS = [
  'BEGINNER',
  'LETTER',
  'WORD',
  'PARAGRAPH',
  'STORY',
] as const;

export const MATH_BANDS = [
  'BEGINNER',
  'NUMBER_RECOGNITION',
  'ADDITION',
  'SUBTRACTION',
  'MULTIPLICATION',
  'DIVISION',
] as const;

