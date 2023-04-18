import { createContext, useEffect, useMemo, useState } from "react";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { IncomingMessages, SentMessages } from "../helpers/events";
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

  const emit = {
    login: ({username}: {username: string}) => {
      socket.emit(SentMessages.LOGIN, { name: username });
    },
    getUserRequest: (userId: string, roomId: string) => {
      socket.emit(SentMessages.GET, { userId, roomId });
    },
    getUserFromStorage() {
      const userId = LocalStorageHelper.get(LS_KEYS.USER_ID);
      const roomId = LocalStorageHelper.get(LS_KEYS.ROOM_ID);
      emit.getUserRequest(userId, roomId)
    }
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
    socket.on(IncomingMessages.CONNECTED, handlers.connected)
    socket.on(IncomingMessages.DISCONNECTED, handlers.disconnected);
    // socket.on(IncomingMessages.GET, handlers.getUser);
  }

  const actions = useMemo(() => ({
    ...emit,
    updateState,
  }), []);

  useEffect(() => {
    init();
    emit.getUserFromStorage();
    return () => {
      socket.off(IncomingMessages.CONNECTED, handlers.connected)
      socket.off(IncomingMessages.DISCONNECTED, handlers.disconnected);
      // socket.off(IncomingMessages.GET, handlers.getUser);
    }
  }, []);

  return (
    <SocketContext.Provider value={{ ...actions, ...state }}>
      {children}
    </SocketContext.Provider>
  );
};
