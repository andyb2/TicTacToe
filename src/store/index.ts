import { configureStore } from '@reduxjs/toolkit';
import winnerSlice from './reducer';

export const store = configureStore({
        reducer: {
            grid: winnerSlice,
        }
});

export type RootState = ReturnType<typeof store.getState>