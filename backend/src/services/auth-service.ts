import { auth, db } from '../config/firebase.js';
import { User } from '../types/index.js';

export async function createUser(email: string, password: string, displayName: string) {
  // Create Firebase Auth user
  const userRecord = await auth.createUser({
    email,
    password,
    displayName,
  });

  // Create user document in Firestore
  const user: User = {
    id: userRecord.uid,
    email,
    displayName,
    createdAt: new Date(),
    groups: [],
  };

  await db.collection('users').doc(userRecord.uid).set(user);

  return user;
}

export async function getUserById(uid: string): Promise<User | null> {
  const doc = await db.collection('users').doc(uid).get();
  return doc.exists ? (doc.data() as User) : null;
}