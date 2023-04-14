import { createContext, useState } from "react";
import { WithChildrens } from "../helpers/types";
import { IUser, UserStatus } from "../api/user/model";

export interface UserActions {
  setName: (newValue: string) => void;
  updateUserState: (update: Partial<UserState>) => void;
}

type UserState = IUser;

export type UserContextType = UserActions & UserState

export const UserContext = createContext<UserContextType>({} as UserContextType);
const defaultState: UserState = {
  name: '',
  status: UserStatus.ACTIVE,
  socketId: '',
  id: '',
}

export const UserContextProvider: WithChildrens<any> = ({ children }) => {
  const [state, setState] = useState(defaultState);
  const setName = (newValue: string) => {
    setState(prev => ({...prev, name: newValue}));
  }

  const updateUserState = (update: Partial<UserState>) => {
    setState((prev) => ({ ...prev, ...update }));
  };


  const actions = {
    setName,
    updateUserState,
  }

  return (
    <UserContext.Provider value={{...actions, ...state}}>{children}</UserContext.Provider>
  )
}