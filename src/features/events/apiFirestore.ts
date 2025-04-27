import { db } from "@/firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

import { EventItem } from "@/features/events/types";

export const addEvent = async (
  userId: string,
  event: Omit<EventItem, "id">
) => {
  const eventsCollection = collection(db, "users", userId, "events");
  const docRef = await addDoc(eventsCollection, event);
  return { ...event, id: docRef.id };
};

export const updateEventInFirestore = async (
  userId: string,
  eventId: string,
  updatedData: Partial<EventItem>
) => {
  const eventRef = doc(db, "users", userId, "events", eventId);
  await updateDoc(eventRef, updatedData);
};

export const deleteEventFromFirestore = async (
  userId: string,
  eventId: string
) => {
  const eventRef = doc(db, "users", userId, "events", eventId);
  await deleteDoc(eventRef);
};

export const fetchEventsFromFirestore = async (userId: string) => {
  const eventsCollection = collection(db, "users", userId, "events");
  const snapshot = await getDocs(eventsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
