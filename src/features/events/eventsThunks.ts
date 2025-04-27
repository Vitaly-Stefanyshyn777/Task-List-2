import { createAsyncThunk } from "@reduxjs/toolkit";
import { EventItem } from "./types";
import {
  fetchEventsFromFirestore,
  addEventToFirestore,
  updateEventInFirestore,
  deleteEventFromFirestore,
} from "./eventsFirestore";

export const fetchEvents = createAsyncThunk<
  EventItem[],
  string,
  { rejectValue: string }
>("events/fetchEvents", async (userId, { rejectWithValue }) => {
  try {
    return await fetchEventsFromFirestore(userId);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch events";
    return rejectWithValue(message);
  }
});

export const addEvent = createAsyncThunk<
  EventItem,
  { userId: string; eventData: Omit<EventItem, "id" | "createdAt"> },
  { rejectValue: string }
>("events/addEvent", async ({ userId, eventData }, { rejectWithValue }) => {
  try {
    const fullEventData = { ...eventData, createdAt: new Date().toISOString() };
    return await addEventToFirestore(userId, fullEventData);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add event";
    return rejectWithValue(message);
  }
});

export const updateEvent = createAsyncThunk<
  { eventId: string; updatedData: Partial<EventItem> },
  { userId: string; eventId: string; updatedData: Partial<EventItem> },
  { rejectValue: string }
>(
  "events/updateEvent",
  async ({ userId, eventId, updatedData }, { rejectWithValue }) => {
    try {
      await updateEventInFirestore(userId, eventId, updatedData);
      return { eventId, updatedData };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update event";
      return rejectWithValue(message);
    }
  }
);

export const deleteEvent = createAsyncThunk<
  string,
  { userId: string; eventId: string },
  { rejectValue: string }
>("events/deleteEvent", async ({ userId, eventId }, { rejectWithValue }) => {
  try {
    await deleteEventFromFirestore(userId, eventId);
    return eventId;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete event";
    return rejectWithValue(message);
  }
});
