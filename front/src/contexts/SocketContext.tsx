import { createContext, useEffect, useMemo, useState } from "react";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { DefaultMessages, SentMessages } from "../helpers/events";
import { LS_KEYS, LocalStorageHelper } from "../helpers/localStorage";
import { WithChildrens } from "../helpers/types";
const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL || 'http://localhost:3001';
export const socket = io(GATEWAY_URL);

interface LoginActionProps {
  username: string
}

export interface SocketActions {
  login: (data: LoginActionProps) => void;
  updateState: (update: Partial<SocketState>) => void;
  getUserRequest: (userId: string, roomId: string) => void;
  getUserFromStorage: () => void;
  getOrCreateRoom: (roomSlug: string | null) => void;
  setError: (error: string | null) => void;
}

export interface SocketState {
  connected: boolean;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  error: string | null;
}

export type SocketContextType = SocketActions & SocketState;

export const SocketContext = createContext<SocketContextType>(
  {} as SocketContextType
);
const defaultState: SocketState = {
  connected: false,
  socket,
  error: null,
};

export const SocketContextProvider: WithChildrens<any> = ({ children }) => {
  const [state, setState] = useState(defaultState);
  const updateState = (update: Partial<SocketState>) => {
    setState((prev) => ({ ...prev, ...update }));
  };

  const setError = (error: string | null) => {
    updateState({error})
  }

  const emit = {
    login: ({username}: {username: string}) => {
      socket.emit(SentMessages.LOGIN, { name: username });
    },
    getUserRequest: (userId: string, roomSlug: string) => {
      socket.emit(SentMessages.GET, { userId, roomSlug });
    },
    getUserFromStorage() {
      const roomIdFromLink = window.location.pathname.slice(1);
      const userId = LocalStorageHelper.get(LS_KEYS.USER_ID);
      emit.getUserRequest(userId, roomIdFromLink)
    },
    getOrCreateRoom(roomSlug: string | null) {
      const userId = LocalStorageHelper.get(LS_KEYS.USER_ID);
      socket.emit(SentMessages.GET_OR_CREATE_ROOM, { roomSlug, userId })
    },
    setError
  }


  const handlers = {
    connected: () => {
      console.log('CONNECTED')
    },
    disconnected: () => {
      console.log('DISCONNECTED')
      updateState({ error: 'DISCONNECTED' });
    },
    getUser: (data: any) => {
      console.log(data);
    },
  }

  const init = () => {
    socket.on(DefaultMessages.CONNECTED, handlers.connected)
    socket.on(DefaultMessages.DISCONNECTED, handlers.disconnected);
    emit.getUserFromStorage();
  }

  const actions = useMemo(() => ({
    ...emit,
    updateState,
  }), []);

  useEffect(() => {
    init();
    return () => {
      socket.off(DefaultMessages.CONNECTED, handlers.connected)
      socket.off(DefaultMessages.DISCONNECTED, handlers.disconnected);
    }
  }, []);

  return (
    <SocketContext.Provider value={{ ...actions, ...state }}>
      {children}
    </SocketContext.Provider>
  );
};
