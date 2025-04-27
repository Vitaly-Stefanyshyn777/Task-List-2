import { EventItem } from "./types";
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
  async ({
    userId,
    eventData,
  }: {
    userId: string;
    eventData: Omit<EventItem, "id" | "createdAt">;
  }) => {
    const fullEventData = {
      ...eventData,
      createdAt: new Date().toISOString(),
    };
    const newEvent = await addEventToFirestore(userId, fullEventData);
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
    updatedData: Partial<EventItem>;
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
