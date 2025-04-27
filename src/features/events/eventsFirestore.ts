import { db } from "@/firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { EventItem } from "./types";

const eventsCollection = (userId: string) =>
  collection(db, "users", userId, "events");

export const fetchEventsFromFirestore = async (userId: string) => {
  const snapshot = await getDocs(eventsCollection(userId));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as EventItem));
};

export const addEventToFirestore = async (
  userId: string,
  eventData: Omit<EventItem, "id">
) => {
  const docRef = await addDoc(eventsCollection(userId), eventData);
  return { id: docRef.id, ...eventData };
};

export const updateEventInFirestore = async (
  userId: string,
  eventId: string,
  updatedData: Partial<EventItem>
) => {
  const ref = doc(db, "users", userId, "events", eventId);
  await updateDoc(ref, updatedData);
};

export const deleteEventFromFirestore = async (
  userId: string,
  eventId: string
) => {
  const ref = doc(db, "users", userId, "events", eventId);
  await deleteDoc(ref);
};
