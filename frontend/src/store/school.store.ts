import { create } from 'zustand';
import { School } from '../types';
import { schoolsService } from '../services/schools.service';

interface SchoolState {
  schools: School[];
  currentSchool: School | null;
  isLoading: boolean;
  setCurrentSchool: (school: School | null) => void;
  fetchSchools: () => Promise<void>;
  fetchSchoolById: (id: string) => Promise<void>;
}

export const useSchoolStore = create<SchoolState>((set) => ({
  schools: [],
  currentSchool: null,
  isLoading: false,

  setCurrentSchool: (school) => set({ currentSchool: school }),

  fetchSchools: async () => {
    set({ isLoading: true });
    try {
      const schools = await schoolsService.getAll();
      set({ schools, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchSchoolById: async (id: string) => {
    set({ isLoading: true });
    try {
      const school = await schoolsService.getById(id);
      set({ currentSchool: school, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

