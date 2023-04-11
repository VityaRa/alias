export enum UserStatus {
  'ACTIVE',
  'READY',
  'DISCONNECTED'
}

export interface IUser { 
  name?: string;
  id?: string;
  status: UserStatus;
  socketId?: string;
}