import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { RoomContextProvider } from "./contexts/RoomContext";
import { SocketContextProvider } from "./contexts/SocketContext";
import { UserContextProvider } from "./contexts/UserContext";

import "./index.css";

import { Main } from "./layouts/main";
import { Router } from "./router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SocketContextProvider>
      <UserContextProvider>
        <RoomContextProvider>
          <Main>
            <RouterProvider router={Router} />
          </Main>
        </RoomContextProvider>
      </UserContextProvider>
    </SocketContextProvider>
  </React.StrictMode>
);
