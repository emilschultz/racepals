import { db } from '../config/firebase.js';
import { User } from '../types/index.js';

export async function getUser(uid: string): Promise<User | null> {
  const doc = await db.collection('users').doc(uid).get();
  return doc.exists ? (doc.data() as User) : null;
}

export async function updateUser(uid: string, data: Partial<User>): Promise<void> {
  await db.collection('users').doc(uid).update(data);
}