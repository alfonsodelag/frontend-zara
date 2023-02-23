import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import { podcastApi } from '../services/podcast';
import podcastDetailReducer from "./details.slice"

export const store = configureStore({
  reducer: {
    [podcastApi.reducerPath]: podcastApi.reducer,
    podcast: podcastDetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(podcastApi.middleware),
});

setupListeners(store.dispatch);
export const useAppDispatch = () => useDispatch();
