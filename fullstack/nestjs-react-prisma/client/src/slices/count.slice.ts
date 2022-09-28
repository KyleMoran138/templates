import { StateCreator } from 'zustand';
import { Store } from '../store';

export interface CountSlice {
  count: {
    count: number;
    increment: () => void;
  }
}

export const createCountSlice: StateCreator<Store, [], [], CountSlice> = (set) => ({
  count: {
    count: 0,
    increment: () => set((state) => ({ 
      count: { 
        ...state.count, 
        count: state.count.count + 1 } 
      })
    ),
  }
});