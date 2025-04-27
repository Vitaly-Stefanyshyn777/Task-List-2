import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
  query,
  where,
} from "firebase/firestore";
import { EventItem } from "./types";

export const fetchEvents = createAsyncThunk<
  EventItem[],
  string,
  { rejectValue: string }
>("events/fetchEvents", async (userId, { rejectWithValue }) => {
  try {
    const eventsQuery = query(
      collection(db, "events"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(eventsQuery);
    const events = querySnapshot.docs.map((docSnapshot) => {
      const data = docSnapshot.data();
      return {
        id: docSnapshot.id,
        ...data,
        createdAt: data.createdAt
          ? (data.createdAt as Timestamp).toDate().toISOString()
          : null,
      } as EventItem;
    });
    return events;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch events";
    return rejectWithValue(message);
  }
});

export const addEvent = createAsyncThunk<
  EventItem,
  { userId: string; event: Omit<EventItem, "id" | "createdAt"> },
  { rejectValue: string }
>("events/addEvent", async ({ userId, event }, { rejectWithValue }) => {
  try {
    const newEventData = {
      ...event,
      userId,
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, "events"), newEventData);
    return {
      id: docRef.id,
      ...event,
      createdAt: new Date().toISOString(),
    } as EventItem;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add event";
    return rejectWithValue(message);
  }
});

export const updateEvent = createAsyncThunk<
  { id: string; updatedData: Partial<EventItem> },
  { eventId: string; updatedData: Partial<EventItem> },
  { rejectValue: string }
>(
  "events/updateEvent",
  async ({ eventId, updatedData }, { rejectWithValue }) => {
    try {
      await updateDoc(doc(db, "events", eventId), updatedData);
      return { id: eventId, updatedData };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update event";
      return rejectWithValue(message);
    }
  }
);

export const deleteEvent = createAsyncThunk<
  string,
  { eventId: string },
  { rejectValue: string }
>("events/deleteEvent", async ({ eventId }, { rejectWithValue }) => {
  try {
    await deleteDoc(doc(db, "events", eventId));
    return eventId;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete event";
    return rejectWithValue(message);
  }
});
