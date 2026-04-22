import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/axios';

/**
 * FETCH ALL SUBSCRIBERS
 */
export const fetchSubscribers = createAsyncThunk(
  'subscribers/fetchSubscribers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/subscribers');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

/**
 * DELETE SUBSCRIBER
 */
export const deleteSubscriber = createAsyncThunk(
  'subscribers/deleteSubscriber',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/subscribers/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

/**
 * UPDATE SUBSCRIBER
 */
export const updateSubscriber = createAsyncThunk(
  'subscribers/updateSubscriber',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/subscribers/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
