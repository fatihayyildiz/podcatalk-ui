import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { podcastApi } from './services/podcastApi';
import { authApi } from './services/authApi';
import { messageApi } from './services/messageApi';
import { audioApi } from './services/audioApi';

export const store = configureStore({
  reducer: {
    [podcastApi.reducerPath]: podcastApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [audioApi.reducerPath]: audioApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(podcastApi.middleware, authApi.middleware, messageApi.middleware, audioApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 