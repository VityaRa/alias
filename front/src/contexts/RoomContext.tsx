import { createContext, useState } from "react";
import { WithChildrens } from "../helpers/types";
import { ITeam } from "../api/team/model";
import { IUser, UserStatus } from "../api/user/model";
import { ITheme } from "../api/theme/model";
import { IWord } from "../api/word/model";
import { WordStatus } from "../api/word/model";

export const testState: RoomState = {
  teams: [
    {
      title: "Test 1",
      participants: [
        {
          name: "test name",
          status: UserStatus.READY
        },
        {
          name: "test name 2",
          status: UserStatus.READY
        }
      ]
    }
  ],
  words: [
    {
      value: "123213",
      id: "213",
      status: WordStatus.CORRECT
    }
  ],
  link: "testlink123213",
  themes: [
    {
      name: "Обычный",
      id: "gwegerijgiowerjgioo"
    },
    {
      name: "Сложный",
      id: "gwegerijgiowerjgio123"
    }
  ],
  selectedThemeId: "",
  viewers: [
    {
      name: "vieview1",
      status: UserStatus.DISCONNECTED
    }
  ]
};

export interface RoomActions {
  updateRoomState: (update: Partial<RoomState>) => void;
}

export interface RoomState {
  // players: Array<IUser>;
  teams: Array<ITeam>;
  words: Array<IWord>;
  link: string;
  themes: Array<ITheme>;
  selectedThemeId?: string;
  viewers: Array<IUser>;
}

export type RoomContextType = RoomActions & RoomState;

export const RoomContext = createContext<RoomContextType>(
  {} as RoomContextType
);
const isTest = true;
const _defaultState: RoomState = {
  teams: [],
  words: [],
  link: "",
  themes: [],
  selectedThemeId: "",
  viewers: []
};
const defaultState: RoomState = isTest ? testState : _defaultState;

export const RoomContextProvider: WithChildrens<any> = ({ children }) => {
  const [state, setState] = useState(defaultState);
  const updateRoomState = (update: Partial<RoomState>) => {
    setState((prev) => ({ ...prev, ...update }));
  };
  const actions = {
    updateRoomState
  };

  return (
    <RoomContext.Provider value={{ ...actions, ...state }}>
      {children}
    </RoomContext.Provider>
  );
};
