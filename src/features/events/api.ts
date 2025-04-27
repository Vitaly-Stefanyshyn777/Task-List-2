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

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (userId: string, { rejectWithValue }) => {
    try {
      const eventsQuery = query(
        collection(db, "events"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(eventsQuery);
      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt
            ? (data.createdAt as Timestamp).toDate().toISOString()
            : null,
        };
      }) as EventItem[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (
    {
      userId,
      event,
    }: { userId: string; event: Omit<EventItem, "id" | "createdAt"> },
    { rejectWithValue }
  ) => {
    try {
      const newEvent = {
        ...event,
        userId,
        createdAt: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, "events"), newEvent);
      return {
        id: docRef.id,
        ...event,
        createdAt: new Date().toISOString(),
      } as EventItem;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async (
    {
      eventId,
      updatedData,
    }: { eventId: string; updatedData: Partial<EventItem> },
    { rejectWithValue }
  ) => {
    try {
      await updateDoc(doc(db, "events", eventId), updatedData);
      return { id: eventId, updatedData };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async ({ eventId }: { eventId: string }, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "events", eventId));
      return eventId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
