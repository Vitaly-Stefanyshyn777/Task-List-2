import { createSlice } from "@reduxjs/toolkit";
import { EventItem } from "./types";
import {
  fetchEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "./eventsThunks";

interface EventsState {
  events: EventItem[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? null;
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message ?? null;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message ?? null;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message ?? null;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const { eventId, updatedData } = action.payload;
        const index = state.events.findIndex((event) => event.id === eventId);
        if (index !== -1) {
          state.events[index] = { ...state.events[index], ...updatedData };
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event.id !== action.payload
        );
      });
  },
});

export default eventSlice.reducer;
