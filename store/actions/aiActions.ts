import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendAiMessage = createAsyncThunk(
    'ai/sendMessage',
    async (message: string, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/ai/chat', { message });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.text || "I'm having trouble connecting to the vault right now."
            );
        }
    }
);
