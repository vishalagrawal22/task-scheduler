import {
  AuthError,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase-config";

export const USER_NOT_FOUND = "auth/user-not-found";
export const WRONG_PASSWORD = "auth/wrong-password";

export async function loginWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    const authError = err as AuthError;
    if (authError.code === "auth/user-not-found") {
      throw USER_NOT_FOUND;
    } else if (authError.code === "auth/wrong-password") {
      throw WRONG_PASSWORD;
    }
    throw err;
  }
}

export async function loginWithGooglePopup() {
  const googleProvider = new GoogleAuthProvider();
  await signInWithPopup(auth, googleProvider);
}

export async function logout() {
  await signOut(auth);
}

export function useUser() {
  const [user, loading, error] = useAuthState(auth);
  return {
    user,
    loading,
    error: error as AuthError,
  };
}
