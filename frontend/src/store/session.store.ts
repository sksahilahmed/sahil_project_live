import { create } from 'zustand';
import { Session } from '../types';
import { sessionsService } from '../services/sessions.service';

interface SessionState {
  sessions: Session[];
  currentSession: Session | null;
  isLoading: boolean;
  fetchSessions: (classId?: string) => Promise<void>;
  createSession: (data: any) => Promise<Session>;
  setCurrentSession: (session: Session | null) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  sessions: [],
  currentSession: null,
  isLoading: false,

  fetchSessions: async (classId?: string) => {
    set({ isLoading: true });
    try {
      const sessions = await sessionsService.getAll(classId);
      set({ sessions, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  createSession: async (data) => {
    set({ isLoading: true });
    try {
      const session = await sessionsService.create(data);
      set((state) => ({
        sessions: [session, ...state.sessions],
        currentSession: session,
        isLoading: false,
      }));
      return session;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  setCurrentSession: (session) => set({ currentSession: session }),
}));

