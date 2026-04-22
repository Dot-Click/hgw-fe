import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/axios';

/**
 * FETCH ALL PLAYERS
 * Retrieves the full list of legends ranked by HGW score.
 */
export const fetchPlayers = createAsyncThunk(
  'players/fetchPlayers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/players');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

/**
 * ADD NEW PLAYER
 * Persists a new legend to the vault.
 */
export const addPlayer = createAsyncThunk(
  'players/addPlayer',
  async (playerData: any, { rejectWithValue }) => {
    try {
      const response = await api.post('/players', playerData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

/**
 * UPDATE PLAYER
 * Modifies an existing legend's statistics or metadata.
 */
export const updatePlayerAction = createAsyncThunk(
  'players/updatePlayer',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/players/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

/**
 * DELETE PLAYER
 * Removes a legend from the vault permanently.
 */
export const deletePlayerAction = createAsyncThunk(
  'players/deletePlayer',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/players/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
