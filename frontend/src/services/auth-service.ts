import { 
//   createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
//   type User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../config/firebase';

const API_URL = import.meta.env.VITE_API_URL;

export async function signup(email: string, password: string, displayName: string) {
  // Call backend to create user profile
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, displayName }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  // Sign in with Firebase
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function login(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function logout() {
  await signOut(auth);
}

export async function getAuthToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
}