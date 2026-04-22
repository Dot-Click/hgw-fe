import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSubscribers, deleteSubscriber, updateSubscriber } from '../actions/subscriberActions';

export interface Subscriber {
  id: string;
  email: string;
  source: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SubscriberState {
  subscribers: Subscriber[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriberState = {
  subscribers: [],
  loading: false,
  error: null,
};

const subscriberSlice = createSlice({
  name: 'subscribers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Subscribers
      .addCase(fetchSubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscribers.fulfilled, (state, action: PayloadAction<Subscriber[]>) => {
        state.loading = false;
        state.subscribers = action.payload;
      })
      .addCase(fetchSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Subscriber
      .addCase(updateSubscriber.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubscriber.fulfilled, (state, action: PayloadAction<Subscriber>) => {
        state.loading = false;
        state.subscribers = state.subscribers.map(s => s.id === action.payload.id ? action.payload : s);
      })
      .addCase(updateSubscriber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Subscriber
      .addCase(deleteSubscriber.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubscriber.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.subscribers = state.subscribers.filter(s => s.id !== action.payload);
      })
      .addCase(deleteSubscriber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { } = subscriberSlice.actions;
export { fetchSubscribers, deleteSubscriber, updateSubscriber };
export default subscriberSlice.reducer;
