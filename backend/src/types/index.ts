export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
  groups: string[];
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