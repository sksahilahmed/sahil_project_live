import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../i18n/config';

type Language = 'en' | 'hi' | 'or';

interface I18nState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      language: (localStorage.getItem('language') as Language) || 'en',

      setLanguage: (lang: Language) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        set({ language: lang });
      },
    }),
    {
      name: 'i18n-storage',
    }
  )
);

