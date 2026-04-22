import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPlayers, addPlayer, updatePlayerAction, deletePlayerAction } from '../actions/playerActions';

export interface Player {
  id: string;
  name: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
  positionRole: string;
  era: string;
  country: string;
  appearancesGames: number;
  goalsPoints: number;
  majorAchievements: number;
  dominance: number;
  longevity: number;
  peakPerformance: number;
  championships: number;
  records: number;
  culturalImpact: number;
  clutchFactor: number;
  versatility: number;
  rivalry: number;
  legacy: number;
  image?: string | null;
  status: "DRAFT" | "PUBLISHED";
  finalScore: number;
  createdAt: string;
  updatedAt: string;
}

interface PlayerState {
  players: Player[];
  loading: boolean;
  error: string | null;
}

const initialState: PlayerState = {
  players: [],
  loading: false,
  error: null,
};

const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Players
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action: PayloadAction<Player[]>) => {
        state.loading = false;
        state.players = action.payload;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add Player
      .addCase(addPlayer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPlayer.fulfilled, (state, action: PayloadAction<Player>) => {
        state.loading = false;
        state.players.unshift(action.payload);
      })
      .addCase(addPlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Player
      .addCase(updatePlayerAction.fulfilled, (state, action: PayloadAction<Player>) => {
        const index = state.players.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.players[index] = action.payload;
        }
      })
      // Delete Player
      .addCase(deletePlayerAction.fulfilled, (state, action: PayloadAction<string>) => {
        state.players = state.players.filter(p => p.id !== action.payload);
      });
  },
});

export const { } = playerSlice.actions;
export { fetchPlayers, addPlayer, updatePlayerAction, deletePlayerAction };
export default playerSlice.reducer;
