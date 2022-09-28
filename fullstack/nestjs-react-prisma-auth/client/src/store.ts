import { ExampleModel } from '@prisma/client';
import create from 'zustand';
import { CountSlice, createCountSlice } from './slices/count.slice';
import { createRequestSlice, RequestSlice } from './slices/request.slice';

export type Store = {}
& CountSlice
& RequestSlice;


export const useStore = create<Store>()((...a) => ({
  ...createCountSlice(...a),
  ...createRequestSlice(...a),
}));