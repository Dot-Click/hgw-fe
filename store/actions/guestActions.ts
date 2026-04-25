import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGuests = createAsyncThunk(
    'guests/fetchGuests',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/guests');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch guests');
        }
    }
);
