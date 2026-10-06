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
    uid: userRecord.uid,
    displayName,
    email,
    phone: userRecord.phoneNumber || '',
    photoUrl: userRecord.photoURL || '',
    createdAt: new Date().toString(),
    groupIds: [],
    isMinor: false, // Default value; can be updated later based on application logic
  };

  await db.collection('users').doc(userRecord.uid).set(user);

  return user;
}

export async function getUserById(uid: string): Promise<User | null> {
  const doc = await db.collection('users').doc(uid).get();
  return doc.exists ? (doc.data() as User) : null;
}