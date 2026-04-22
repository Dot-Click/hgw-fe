import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/axios';

/**
 * FETCH ALL CATEGORIES
 * Retrieves all sport/legend classifications.
 */
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

/**
 * ADD NEW CATEGORY
 */
export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (category: { name: string; color: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/categories', category);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

/**
 * UPDATE CATEGORY
 */
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, data }: { id: string; data: { name: string; color: string } }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/categories/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

/**
 * DELETE CATEGORY
 */
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/categories/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
