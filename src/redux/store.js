import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './Slice.js';

export const store = configureStore({
  reducer: contactsReducer,
});
