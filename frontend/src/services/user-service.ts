// frontend/src/services/user-service.ts
import { getAuthToken } from './auth-service';

// Minimal lokal type — matcher backend's User, men holdt separat for nu.
// Del typen mellem frontend/backend hvis vi vil undgå dobbeltvedligehold.
interface User {
  uid: string;
  displayName: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  createdAt: string;
  groupIds: string[];
  isMinor?: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;

export async function getCurrentUser(): Promise<User | null> {
  const token = await getAuthToken();
  if (!token) return null;

  const res = await fetch(`${API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error(`Kunne ikke hente brugerdata (status ${res.status})`);
  }

  const { user } = await res.json();
  return user;
}