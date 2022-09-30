import { User } from '@prisma/client';
import { StateCreator } from 'zustand';
import { Store } from '../store';

export interface AuthSlice {
  auth: {
    token: string | null;
    user: Omit<User, "passwordHash" | "salt"> | null;
    login: (identifier: string, password: string) => void;
    logout: () => void;
    getProfile: () => void;
  };
}

export const createAuthSlice: StateCreator<Store, [], [], AuthSlice> = (set, get) => ({
  auth: {
    token: null,
    user: null,

    login: async (identifier: string, password: string) => {
      const response = await get().request.makeRequest<{ access_token: string }>(
        '/auth/login',
        {
          method: 'POST',
        },
        {
          body: {
            identifier,
            password,
          },
        }
      );

      if (response) {
        set((state) => ({
          ...state,
          auth: {
            ...state.auth,
            token: response.access_token,
          },
        }));
        get().auth.getProfile();
      }
    },

    logout: () => {
      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          token: null,
          user: null,
        },
      }));
    },

    getProfile: async () => {
      const response = await get().request.makeRequest<Omit<User, "passwordHash" | "salt">>(
        '/auth/profile',
        {
          method: 'GET',
        },
        {
          useAuth: true,
        }
      );

      if (response) {
        set((state) => ({
          ...state,
          auth: {
            ...state.auth,
            user: response,
          },
        }));
      }
    }
  }
});
