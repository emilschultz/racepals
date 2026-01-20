import { db } from '../config/firebase.js';
import { Group } from '../types/index.js';

function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export async function createGroup(
  name: string,
  race: string,
  createdBy: string
): Promise<Group> {
  const group: Group = {
    id: '',
    name,
    race,
    createdBy,
    members: [createdBy],
    inviteCode: generateInviteCode(),
    createdAt: new Date(),
  };

  const docRef = await db.collection('groups').add(group);
  group.id = docRef.id;
  
  await docRef.update({ id: docRef.id });

  // Add group to user's groups
  await db.collection('users').doc(createdBy).update({
    groups: admin.firestore.FieldValue.arrayUnion(docRef.id),
  });

  return group;
}

export async function getGroup(groupId: string): Promise<Group | null> {
  const doc = await db.collection('groups').doc(groupId).get();
  return doc.exists ? (doc.data() as Group) : null;
}

export async function joinGroupByInviteCode(
  inviteCode: string,
  userId: string
): Promise<Group | null> {
  const snapshot = await db
    .collection('groups')
    .where('inviteCode', '==', inviteCode)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  const groupDoc = snapshot.docs[0];
  const group = groupDoc.data() as Group;

  if (!group.members.includes(userId)) {
    await groupDoc.ref.update({
      members: admin.firestore.FieldValue.arrayUnion(userId),
    });

    await db.collection('users').doc(userId).update({
      groups: admin.firestore.FieldValue.arrayUnion(groupDoc.id),
    });
  }

  return { ...group, id: groupDoc.id };
}