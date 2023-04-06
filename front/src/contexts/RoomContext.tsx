import { createContext, useState } from "react";
import { WithChildrens } from "../helpers/types";

export interface RoomActions {

}

export interface RoomState {
  players: [];
  teams: [];
  words: [];
  link?: string;
}

export type RoomContextType = RoomActions & RoomState

export const RoomContext = createContext<RoomContextType>({} as RoomContextType);
const defaultState: RoomState = {
  players: [],
  teams: [],
  words: [],
  link: '',
}

export const RoomContextProvider: WithChildrens<any> = ({ children }) => {
  const [state, setState] = useState(defaultState);
  const actions = {
    
  }

  return (
    <RoomContext.Provider value={{...actions, ...state}}>{children}</RoomContext.Provider>
  )
}