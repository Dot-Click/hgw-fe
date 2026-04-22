import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import categoryReducer from './reducers/categoryReducer';
import playerReducer from './reducers/playerReducer';
import subscriberReducer from './reducers/subscriberReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categoryReducer,
        players: playerReducer,
        subscribers: subscriberReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
