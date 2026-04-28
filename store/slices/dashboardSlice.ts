import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDashboardStats } from "../actions/dashboardActions";

interface DashboardStats {
    totalPlayers: number;
    publishedPlayers: number;
    totalArticles: number;
    totalSubscribers: number;
    playersChange: string;
    publishedChange: string;
    articlesChange: string;
    subscribersChange: string;
}

interface RecentPlayer {
    id: string;
    name: string;
    image: string | null;
    status: string;
    finalScore: number;
    category: { name: string };
}

interface ChartPoint {
    name: string;
    count?: number;
    players?: number;
    subscribers?: number;
}

interface DashboardState {
    stats: DashboardStats | null;
    recentPlayers: RecentPlayer[];
    articlesChart: ChartPoint[];
    growthChart: ChartPoint[];
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    stats: null,
    recentPlayers: [],
    articlesChart: [],
    growthChart: [],
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        clearDashboardError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDashboardStats.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchDashboardStats.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.stats = action.payload.stats;
            state.recentPlayers = action.payload.recentPlayers;
            state.articlesChart = action.payload.articlesChart;
            state.growthChart = action.payload.growthChart;
        });
        builder.addCase(fetchDashboardStats.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
