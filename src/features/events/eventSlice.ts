// // правильне місце: src/features/events/eventSlice.ts
// import { Timestamp } from "firebase/firestore";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { db } from "@/firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   doc,
//   serverTimestamp,
// } from "firebase/firestore";

// export interface EventItem {
//   id: string;
//   title: string;
//   description: string;
//   date: string;
//   time: string;
//   importance: "normal" | "important" | "critical";
//   createdAt: string | null;
// }

// interface EventsState {
//   events: EventItem[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: EventsState = {
//   events: [],
//   loading: false,
//   error: null,
// };

// export const fetchEvents = createAsyncThunk(
//   "events/fetchEvents",
//   async (userId: string, { rejectWithValue }) => {
//     try {
//       const querySnapshot = await getDocs(
//         collection(db, "users", userId, "events")
//       );
//       return querySnapshot.docs.map((doc) => {
//         const data = doc.data();
//         return {
//           id: doc.id,
//           ...data,
//           createdAt: data.createdAt
//             ? (data.createdAt as Timestamp).toDate().toISOString()
//             : null,
//         };
//       }) as EventItem[];
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const addEvent = createAsyncThunk(
//   "events/addEvent",
//   async (
//     {
//       userId,
//       event,
//     }: { userId: string; event: Omit<EventItem, "id" | "createdAt"> },
//     { rejectWithValue }
//   ) => {
//     try {
//       const docRef = await addDoc(collection(db, "users", userId, "events"), {
//         ...event,
//         createdAt: serverTimestamp(),
//       });
//       //   return { id: docRef.id, ...event, createdAt: new Date() } as EventItem;
//       return {
//         id: docRef.id,
//         ...event,
//         createdAt: new Date().toISOString(),
//       } as EventItem;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const updateEvent = createAsyncThunk(
//   "events/updateEvent",
//   async (
//     {
//       userId,
//       eventId,
//       updatedData,
//     }: { userId: string; eventId: string; updatedData: Partial<EventItem> },
//     { rejectWithValue }
//   ) => {
//     try {
//       //   await updateDoc(doc(db, "users", userId, "events", eventId), updatedData);
//       //   return { id: eventId, updatedData };
//       await updateDoc(doc(db, "users", userId, "events", eventId), updatedData);
//       return { id: eventId, updatedData };
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteEvent = createAsyncThunk(
//   "events/deleteEvent",
//   async (
//     { userId, eventId }: { userId: string; eventId: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       await deleteDoc(doc(db, "users", userId, "events", eventId));
//       return eventId;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const eventSlice = createSlice({
//   name: "events",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEvents.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchEvents.fulfilled, (state, action) => {
//         state.loading = false;
//         state.events = action.payload;
//       })
//       .addCase(fetchEvents.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(addEvent.fulfilled, (state, action) => {
//         state.events.push(action.payload);
//       })
//       .addCase(updateEvent.fulfilled, (state, action) => {
//         const { id, updatedData } = action.payload;
//         const index = state.events.findIndex((event) => event.id === id);
//         if (index !== -1) {
//           state.events[index] = { ...state.events[index], ...updatedData };
//         }
//       })
//       .addCase(deleteEvent.fulfilled, (state, action) => {
//         state.events = state.events.filter(
//           (event) => event.id !== action.payload
//         );
//       });
//   },
// });

// export default eventSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { EventItem } from "./types";
import { fetchEvents, addEvent, updateEvent, deleteEvent } from "./api";

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
        state.error = action.payload as string;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const { id, updatedData } = action.payload;
        const index = state.events.findIndex((event) => event.id === id);
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
