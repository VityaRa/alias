import { createContext, useState } from "react";
import { WithChildrens } from "../helpers/types";

export interface UserActions {
  setName: (newValue: string) => void;
}

export interface UserState {
  name?: string;
}

export type UserContextType = UserActions & UserState

export const UserContext = createContext<UserContextType>({} as UserContextType);
const defaultState: UserState = {
  name: '',
}

export const UserContextProvider: WithChildrens<any> = ({ children }) => {
  const [state, setState] = useState(defaultState);
  const setName = (newValue: string) => {
    setState(prev => ({...prev, name: newValue}));
  }


  const actions = {
    setName,
  }

  return (
    <UserContext.Provider value={{...actions, ...state}}>{children}</UserContext.Provider>
  )
}