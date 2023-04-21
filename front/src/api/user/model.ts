export enum UserStatus {
  ACTIVE = 'ACTIVE',
  'READY' = 'READY',
  'DISCONNECTED' = 'DISCONNECTED',
}

export interface IUser { 
  name?: string;
  id?: string;
  status: UserStatus;
  socketId?: string;
}