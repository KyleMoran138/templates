import create from 'zustand';
import { CountSlice, createCountSlice } from './slices/count.slice';

export type Store = {}
& CountSlice;

export const useStore = create<Store>()((...a) => ({
  ...createCountSlice(...a),
}));