import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { Main } from "./layouts/main";
import { UserContextProvider } from "./contexts/UserContext";
import { RoomContextProvider } from "./contexts/RoomContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <RoomContextProvider>
        <Main>
          <RouterProvider router={Router} />
        </Main>
      </RoomContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
