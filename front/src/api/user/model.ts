export enum UserStatus {
  'ACTIVE',
  'READY',
  'DISCONNECTED'
}

export interface IUser { 
  name?: string;
  status: UserStatus
}