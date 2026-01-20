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