import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPodcasts, createPodcast, updatePodcast, deletePodcast, fetchPodcastStats, incrementPodcastListens } from '../actions/podcastActions';

interface PodcastStats {
    totalEpisodes: number;
    totalListens: number;
    averageRating: number;
    weeklyReleases: number;
}

interface PodcastState {
    podcasts: any[];
    stats: PodcastStats | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: PodcastState = {
    podcasts: [],
    stats: null,
    loading: false,
    error: null,
    success: false,
};

const podcastSlice = createSlice({
    name: 'podcasts',
    initialState,
    reducers: {
        resetPodcastState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        // Fetch Podcasts
        builder.addCase(fetchPodcasts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPodcasts.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.podcasts = action.payload;
        });
        builder.addCase(fetchPodcasts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Fetch Podcast Stats
        builder.addCase(fetchPodcastStats.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPodcastStats.fulfilled, (state, action: PayloadAction<PodcastStats>) => {
            state.loading = false;
            state.stats = action.payload;
        });
        builder.addCase(fetchPodcastStats.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Create Podcast
        builder.addCase(createPodcast.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(createPodcast.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.podcasts.unshift(action.payload);
            state.success = true;
        });
        builder.addCase(createPodcast.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.success = false;
        });

        // Update Podcast
        builder.addCase(updatePodcast.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(updatePodcast.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            const index = state.podcasts.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.podcasts[index] = action.payload;
            }
            state.success = true;
        });
        builder.addCase(updatePodcast.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.success = false;
        });

        // Delete Podcast
        builder.addCase(deletePodcast.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deletePodcast.fulfilled, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.podcasts = state.podcasts.filter(p => p.id !== action.payload);
        });
        builder.addCase(deletePodcast.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Increment Listens
        builder.addCase(incrementPodcastListens.fulfilled, (state, action: PayloadAction<any>) => {
            const index = state.podcasts.findIndex(p => p.id === action.payload.id || p.id === action.meta.arg);
            if (index !== -1) {
                state.podcasts[index].listens = action.payload.listens;
            }
        });
    },
});

export const { resetPodcastState } = podcastSlice.actions;
export default podcastSlice.reducer;
