import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDashboardStats = createAsyncThunk<any, number | void, { rejectValue: string }>(
    "dashboard/fetchStats",
    async (days = 7, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/dashboard/stats?days=${days || 7}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Failed to fetch dashboard stats");
        }
    }
);
