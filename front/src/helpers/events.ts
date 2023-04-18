export enum SentMessages {
  LOGIN = 'user:login',
  JOIN = 'user:join',
  GET = 'user:get',
  TEAM_CHANGE = 'team:change',
}

export enum IncomingMessages {
  DATA = 'user:data',
  JOINED = 'user:joined',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  TEAM_CHANGED = 'team:changed',
  LOGIN_SUCCESS = 'user:login:success',
}