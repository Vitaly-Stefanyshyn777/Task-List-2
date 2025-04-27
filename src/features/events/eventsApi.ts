import { db } from "@/firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

export const fetchEventsFromFirestore = async (userId: string) => {
  const eventsCollection = collection(db, "users", userId, "events");
  const snapshot = await getDocs(eventsCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addEventToFirestore = async (userId: string, eventData: any) => {
  const eventsCollection = collection(db, "users", userId, "events");
  const docRef = await addDoc(eventsCollection, eventData);
  return { id: docRef.id, ...eventData };
};

export const updateEventInFirestore = async (
  userId: string,
  eventId: string,
  updatedData: any
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
