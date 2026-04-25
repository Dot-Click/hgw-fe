import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGuests } from '../actions/guestActions';

interface GuestState {
    guests: any[];
    loading: boolean;
    error: string | null;
}

const initialState: GuestState = {
    guests: [],
    loading: false,
    error: null,
};

const guestSlice = createSlice({
    name: 'guests',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGuests.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchGuests.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.guests = action.payload;
        });
        builder.addCase(fetchGuests.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default guestSlice.reducer;
