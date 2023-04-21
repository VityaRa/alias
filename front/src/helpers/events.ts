export enum SentMessages {
  LOGIN = 'user:login',
  JOIN = 'user:join',
  GET = 'user:get',
  TEAM_CHANGE = 'team:change',
  GET_OR_CREATE_ROOM = 'room:get_create',
  THEME_CHANGE = 'room:change_theme',
  START_GAME = 'game:start_game',
  NEXT_WORD = 'game:next_word',
  END_GAME = 'game:end_game',
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
  START_GAME = 'sent:game:start_game',
  NEXT_WORD = 'sent:game:next_word',
  END_GAME = 'sent:game:end_game',
}