import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDashboardStats = createAsyncThunk<any, number, { rejectValue: string }>(
    "dashboard/fetchStats",
    async (days: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/dashboard/stats?days=${days}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Failed to fetch dashboard stats");
        }
    }
);
