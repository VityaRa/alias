export enum SentMessages {
  LOGIN = 'user:login',
  JOIN = 'user:join',
  GET = 'user:get',
  TEAM_CHANGE = 'team:change',
  GET_OR_CREATE_ROOM = 'room:get_create',
  THEME_CHANGE = 'room:change_theme',
}

export enum DefaultMessages {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
}

export enum IncomingMessages {
  LOGIN = 'sent:user:login',
  JOIN = 'sent:user:join',
  GET = 'sent:user:get',
  TEAM_CHANGE = 'sent:team:change',
  GET_OR_CREATE_ROOM = 'sent:room:get_create',
  THEME_CHANGE = 'sent:room:change_theme',
}