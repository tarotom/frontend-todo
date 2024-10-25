// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import todo from './slices/todo';

const store = configureStore({
  reducer: {
    todos: todo,
  },
});

export default store;

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
