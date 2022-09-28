import create from 'zustand';
import { CountSlice, createCountSlice } from './slices/count.slice';

export type Store = {
  BACKEND_URL: string;
}
& CountSlice;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ? `${import.meta.env.VITE_BACKEND_URL}/api` : `http://${window.location.hostname}/api`;

console.log('backend url', BACKEND_URL, import.meta.env.VITE_BACKEND_URL)
export const useStore = create<Store>()((...a) => ({
  BACKEND_URL,
  ...createCountSlice(...a),
}));