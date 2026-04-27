import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchArticles = createAsyncThunk(
    "articles/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/articles");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Failed to fetch articles");
        }
    }
);

export const createArticle = createAsyncThunk(
    "articles/create",
    async (articleData: any, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/articles", articleData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Failed to create article");
        }
    }
);

export const updateArticle = createAsyncThunk(
    "articles/update",
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/api/articles/${id}`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Failed to update article");
        }
    }
);

export const deleteArticle = createAsyncThunk(
    "articles/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            await axios.delete(`/api/articles/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Failed to delete article");
        }
    }
);
