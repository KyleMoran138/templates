import { StateCreator } from 'zustand';
import { Store } from '../store';

export interface CountSlice {
  count: {
    count: number;
    increment: () => void;
  }
}

export const createCountSlice: StateCreator<Store, [], [], CountSlice> = (set, get) => ({
  count: {
    count: 0,
    increment: async () => {
      const response = await get().request.makeRequest('', { method: 'GET' });
      console.log('response', response);
      set((state) => ({ 
        count: { 
          ...state.count, 
          count: state.count.count + 1 } 
        })
      )
    },
  }
});