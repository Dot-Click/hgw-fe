import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPodcasts = createAsyncThunk(
    'podcasts/fetchPodcasts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/podcasts');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch podcasts');
        }
    }
);

export const fetchPodcastStats = createAsyncThunk(
    'podcasts/fetchPodcastStats',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/podcasts/stats');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch podcast stats');
        }
    }
);

export const createPodcast = createAsyncThunk(
    'podcasts/createPodcast',
    async (podcastData: any, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/podcasts', podcastData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to create podcast');
        }
    }
);
export const updatePodcast = createAsyncThunk(
    'podcasts/updatePodcast',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/podcasts/${id}`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to update podcast');
        }
    }
);

export const deletePodcast = createAsyncThunk(
    'podcasts/deletePodcast',
    async (id: string, { rejectWithValue }) => {
        try {
            await axios.delete(`/api/podcasts/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to delete podcast');
        }
    }
);

export const incrementPodcastListens = createAsyncThunk(
    'podcasts/incrementListens',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.post(`/api/podcasts/${id}/listen`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to increment listens');
        }
    }
);
