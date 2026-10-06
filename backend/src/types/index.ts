export interface User {
  uid: string; // matcher Firebase Auth uid
  displayName: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  createdAt: string;
  groupIds: string[]; // denormaliseret liste — hurtigt overblik uden collection-group query
  isMinor?: boolean; //  // relevant ved institutionelle konti (skoler) — GDPR
}

export interface Group {
  id: string;
  name: string;
  race: string;
  createdBy: string;
  members: string[];
  inviteCode: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  groupId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  completedBy?: string;
  completedAt?: Date;
}

export interface Checklist {
  id: string;
  groupId: string;
  items: ChecklistItem[];
  createdAt: Date;
}