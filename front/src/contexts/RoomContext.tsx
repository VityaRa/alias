import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ITeam } from "../api/team/model";
import { ITheme } from "../api/theme/model";
import { IUser } from "../api/user/model";
import { IWord, WordStatus } from "../api/word/model";
import { WithChildrens } from "../helpers/types";
import { SocketContext } from "./SocketContext";
import { IncomingMessages, SentMessages } from "../helpers/events";
import { LS_KEYS, LocalStorageHelper } from "../helpers/localStorage";
import { IRoom } from "../api/room/model";

export interface RoomActions {
  updateRoomState: (update: Partial<RoomState>) => void;
  changeTeam: (teamId: string) => void;
  getRoomLink: (slug: string) => string;
  changeTheme: (themeId: string) => void;
  startGame: () => void;
  nextWord: (status: WordStatus) => void;
  setNextWord: (word: IWord) => void;
}

export interface RoomState {
  teamsGroup: Array<ITeam>;
  words: Array<IWord>;
  linkSlug: string;
  themes: Array<ITheme>;
  selectedThemeId?: string;
  viewers: Array<IUser>;
  id?: string;
  owner: IUser | null;
  started: boolean;
  remainTime: number | null;
}

export type RoomContextType = RoomActions & RoomState;

export const RoomContext = createContext<RoomContextType>(
  {} as RoomContextType
);

const defaultState: RoomState = {
  teamsGroup: [],
  words: [],
  linkSlug: "",
  themes: [],
  selectedThemeId: "",
  viewers: [],
  owner: null,
  started: false,
  remainTime: 0,
};

export const RoomContextProvider: WithChildrens<any> = ({ children }) => {
  const [state, setState] = useState(defaultState);
  const { socket } = useContext(SocketContext);
  const updateRoomState = (update: Partial<RoomState>) => {
    setState((prev) => ({ ...prev, ...update }));
  };
  const changeTeam = (teamId: string) => {
    const userId = LocalStorageHelper.get(LS_KEYS.USER_ID);
    socket.emit(SentMessages.TEAM_CHANGE, { teamId, userId, roomId: state.id! })
  };
  const changeTheme = (themeId: string) => {
    socket.emit(SentMessages.THEME_CHANGE, { themeId, linkSlug: state.linkSlug });
  }

  const handleChangeTeam = ({newRoom}: {newRoom: IRoom}) => {
    updateRoomState({...newRoom})
  }
  
  const handleThemeChange = ({newThemeId}: {newThemeId: string}) => {
    updateRoomState({selectedThemeId: newThemeId});
  }

  const startGame = () => {
    socket.emit(SentMessages.START_GAME, { linkSlug: state.linkSlug });
  }

  const getRoomLink = (slug: string) => {
    return window.location.hostname + '/' + slug;
  }

  const nextWord = (status: WordStatus) => {
    socket.emit(SentMessages.NEXT_WORD, { status, linkSlug: state.linkSlug, wordId: state.words.at(-1)?.id });
  }

  const setNextWord = (word: IWord) => {
    setState((prev) => ({...prev, words: [...prev.words, word]}))
  }

  const actions = {
    updateRoomState,
    changeTeam,
    getRoomLink,
    changeTheme,
    startGame,
    nextWord,
    setNextWord,
  };

  useEffect(() => {
    socket.on(IncomingMessages.TEAM_CHANGE, handleChangeTeam);
    socket.on(IncomingMessages.THEME_CHANGE, handleThemeChange);
    return () => {
      socket.off(IncomingMessages.TEAM_CHANGE, handleChangeTeam);
      socket.off(IncomingMessages.THEME_CHANGE, handleThemeChange);
    }
  }, [])

  return (
    <RoomContext.Provider value={{ ...actions, ...state }}>
      {children}
    </RoomContext.Provider>
  );
};
