import { createContext, useState } from "react";
import { WithChildrens } from "../helpers/types";
import { ITeam } from "../api/team/model";
import { IUser } from "../api/user/model";
import { ITheme } from "../api/theme/model";
import { IWord } from "../api/word/model";

export interface RoomActions {
  updateRoomState: (update: Partial<RoomState>) => void,
}

export interface RoomState {
  players: Array<IUser>;
  teams: Array<ITeam>;
  words: Array<IWord>;
  link: string;
  themes: Array<ITheme>;
  selectedThemeId?: string;
  viewers: Array<IUser>,
}

export type RoomContextType = RoomActions & Partial<RoomState>

export const RoomContext = createContext<RoomContextType>({} as RoomContextType);
const defaultState: Partial<RoomState> = {
  players: [],
  teams: [],
  words: [],
  link: '',
  themes: [],
  selectedThemeId: '',
  viewers: [],
}

export const RoomContextProvider: WithChildrens<any> = ({ children }) => {
  const [state, setState] = useState(defaultState);
  const updateRoomState = (update: Partial<RoomState>) => {
    setState(prev => ({...prev, update}))
  }
  const actions = {
    updateRoomState,
  }

  return (
    <RoomContext.Provider value={{...actions, ...state}}>{children}</RoomContext.Provider>
  )
}