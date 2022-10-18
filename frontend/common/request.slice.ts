import { StateCreator } from 'zustand';
import { Store } from '../store';

export interface RequestSlice {
  request: {
    pendingRequest: string[];
    requestHistory: string[];
    BACKEND_URL: string;

    addPendingRequest: (request: string) => void;
    removePendingRequest: (request: string) => void;
    makeRequest<T>(url: string, requestInit: RequestInit, options?: RequestOptions): Promise<T | null>
  }
}

export type RequestOptions = {
  useAuth?: boolean;
  body?: Record<string, unknown>;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ? `${import.meta.env.VITE_BACKEND_URL}/api` : `${window.location.protocol.includes('https') ? 'https' : 'http'}://${window.location.hostname}${window.location.port ? ':'+window.location.port : ''}/api`;

export const createRequestSlice: StateCreator<Store, [], [], RequestSlice> = (set, get) => ({
  request: {
    pendingRequest: [],
    requestHistory: [],
    BACKEND_URL,

    addPendingRequest: (url: string) => {
      set((state) => ({
        ...state,
        request: {
          ...state.request,
          pendingRequest: [...state.request.pendingRequest, url]
        }
      }));
    },

    removePendingRequest: (url: string) => {
      set((state) => ({
        ...state,
        request: {
          ...state.request,
          pendingRequest: state.request.pendingRequest.filter((request) => request !== url),
          requestHistory: [...state.request.requestHistory, url],
        }
      }));
    },

    makeRequest: async <T = unknown>(url: string, requestInit: RequestInit, options?: RequestOptions): Promise<T | null> => {
      const {
        useAuth = false,
        body,
      } = {
        ...options, 
        ...requestInit,
      } || {};

      // If using auth and no Authorization is set, get token and add to request headers
      if(useAuth && !Object.keys((requestInit.headers || {})).includes('Authorization')){
        const token = Object.keys(get()).includes('auth') ? 
          // @ts-ignore Auth slice might not be loaded in template app. This is fine, but if it is then yoink the token
          get().auth.token 
          : null;
        
        if(token){
          requestInit.headers = {
            ...requestInit.headers,
            Authorization: `Bearer ${token}`,
          };
        }
      }

      // If body is provided and no content-type is set add content-type header
      if(body && !Object.keys((requestInit.headers || {})).includes('content-type')){
        requestInit.headers = {
          ...requestInit.headers,
          'content-type': 'application/json',
        };
      }

      // If body is provided and requestInit does not include body, set body
      if(body && !requestInit.body){
        requestInit.body = JSON.stringify(body);
      }

      let searchParams = '';
      if(body && requestInit.method === 'GET'){
        searchParams = `?${new URLSearchParams(body as Record<string, string>)}`;
        requestInit.headers = {
          ...requestInit.headers,
          'content-type': 'application/x-www-form-urlencoded',
        };
      }

      try{
        get().request.addPendingRequest(url);
        const requestResponse = await fetch(`${get().request.BACKEND_URL}${url}${searchParams}`, { ...requestInit, credentials: 'include' });

        if(requestResponse.status < 500){
          try{
            const responseData = await requestResponse.json() as T;
            get().request.removePendingRequest(url);
            return responseData;
          }catch(e){
            get().request.removePendingRequest(url);
            return null
          }
        }

        get().request.removePendingRequest(url);
        console.error('Server error', requestResponse);
        return null;
      }catch(e){
        console.error(e);
        get().request.removePendingRequest(url);
        return null;
      }

    },
  }
});