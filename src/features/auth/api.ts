import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  if (userCredential.user) {
    const token = await userCredential.user.getIdToken();
    localStorage.setItem("token", token);
    localStorage.setItem("email", userCredential.user.email ?? "");
    localStorage.setItem("uid", userCredential.user.uid);
  }
  return userCredential.user;
};

export const registerUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  if (userCredential.user) {
    const token = await userCredential.user.getIdToken();
    localStorage.setItem("token", token);
    localStorage.setItem("email", userCredential.user.email ?? "");
    localStorage.setItem("uid", userCredential.user.uid);
  }
  return userCredential.user;
};
