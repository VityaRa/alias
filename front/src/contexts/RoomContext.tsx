import { createContext, useState } from "react";
import { ITeam } from "../api/team/model";
import { ITheme } from "../api/theme/model";
import { IUser } from "../api/user/model";
import { IWord } from "../api/word/model";
import { WithChildrens } from "../helpers/types";

// export const testState: RoomState = {
//   teams: [
//     {
//       title: "Test 1",
//       id: 'random1',
//       participants: [
//         {
//           name: "test name",
//           status: UserStatus.READY
//         },
//         {
//           name: "test name 2",
//           status: UserStatus.READY
//         }
//       ],
//     },
//     {
//       title: "Test 2",
//       id: 'random2',
//       participants: [
//         {
//           name: "2 - test name",
//           status: UserStatus.READY
//         },
//         {
//           name: "2 - test name 2",
//           status: UserStatus.READY
//         }
//       ]
//     },
//     {
//       title: "Test 2",
//       id: 'random3',
//       participants: [
//       ]
//     },
//   ],
//   words: [
//     {
//       value: "123213",
//       id: "213",
//       status: WordStatus.CORRECT
//     }
//   ],
//   link: "testlink123213",
//   themes: [
//     {
//       name: "Обычный",
//       id: "gwegerijgiowerjgioo"
//     },
//     {
//       name: "Сложный",
//       id: "gwegerijgiowerjgio123"
//     }
//   ],
//   selectedThemeId: "",
//   viewers: [
//     {
//       name: "vieview1",
//       status: UserStatus.DISCONNECTED
//     }
//   ]
// };

export interface RoomActions {
  updateRoomState: (update: Partial<RoomState>) => void;
  changeTeam: (teamId: string) => void;
  getRoomLink: (slug: string) => string;
}

export interface RoomState {
  teams: Array<ITeam>;
  words: Array<IWord>;
  linkSlug: string;
  themes: Array<ITheme>;
  selectedThemeId?: string;
  viewers: Array<IUser>;
}

export type RoomContextType = RoomActions & RoomState;

export const RoomContext = createContext<RoomContextType>(
  {} as RoomContextType
);

const defaultState: RoomState = {
  teams: [],
  words: [],
  linkSlug: "",
  themes: [],
  selectedThemeId: "",
  viewers: []
};

export const RoomContextProvider: WithChildrens<any> = ({ children }) => {
  const [state, setState] = useState(defaultState);
  const updateRoomState = (update: Partial<RoomState>) => {
    setState((prev) => ({ ...prev, ...update }));
  };
  const changeTeam = (teamId: string) => {
    // logic to go to team with specified id
  };

  const getRoomLink = (slug: string) => {
    return window.location.hostname + '/' + slug;
  }

  const actions = {
    updateRoomState,
    changeTeam,
    getRoomLink,
  };

  return (
    <RoomContext.Provider value={{ ...actions, ...state }}>
      {children}
    </RoomContext.Provider>
  );
};
