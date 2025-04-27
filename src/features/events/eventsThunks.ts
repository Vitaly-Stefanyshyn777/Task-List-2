import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addEventToFirestore,
  deleteEventFromFirestore,
  fetchEventsFromFirestore,
  updateEventInFirestore,
} from "./eventsApi";

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (userId: string) => {
    const events = await fetchEventsFromFirestore(userId);
    return events;
  }
);

export const addEvent = createAsyncThunk(
  "events/addEvent",
  async ({ userId, eventData }: { userId: string; eventData: any }) => {
    const newEvent = await addEventToFirestore(userId, eventData);
    return newEvent;
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({
    userId,
    eventId,
    updatedData,
  }: {
    userId: string;
    eventId: string;
    updatedData: any;
  }) => {
    await updateEventInFirestore(userId, eventId, updatedData);
    return { eventId, updatedData };
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async ({ userId, eventId }: { userId: string; eventId: string }) => {
    await deleteEventFromFirestore(userId, eventId);
    return eventId;
  }
);
