export enum UserStatus {
  'ACTIVE',
  'READY',
  'DISCONNECTED'
}

export interface UserDto { 
  name: string;
  id: string;
  status: UserStatus;
  socketId: string;
}

export interface CreateUserDto { 
  name: string;
  socketId: string;
  roomSlug?: string;
}

export interface GetUserDto { 
  userId: string;
  roomSlug: string;
}

export interface CreateRoomDto {
  userId: string;
  roomSlug?: string;
}