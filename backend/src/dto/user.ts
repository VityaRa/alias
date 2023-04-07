export enum UserStatus {
  'ACTIVE',
  'READY',
  'DISCONNECTED'
}

export interface UserDto { 
  name: string;
  id: string;
  status: UserStatus;
}

export interface CreateUserDto { 
  name: string;
}