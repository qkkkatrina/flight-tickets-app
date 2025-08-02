// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from './ticketsSlice'; 

const store = configureStore({
  reducer: {
    tickets: ticketsReducer, 
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;