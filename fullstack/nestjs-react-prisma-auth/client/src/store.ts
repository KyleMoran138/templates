import create from 'zustand';
import { AuthSlice, createAuthSlice } from './slices/auth.slice';
import { CountSlice, createCountSlice } from './slices/count.slice';
import { createRequestSlice, RequestSlice } from './slices/request.slice';

export type Store = {}
& CountSlice
& RequestSlice
& AuthSlice;


export const useStore = create<Store>()((...a) => ({
  ...createCountSlice(...a),
  ...createRequestSlice(...a),
  ...createAuthSlice(...a),
}));