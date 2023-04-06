import {
  createBrowserRouter,
} from "react-router-dom";
import { LoginPage } from "./pages/login/login";
import { RoomPage } from "./pages/room/room";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    loader: () => <div>LOADING</div>,
  },
  {
    path: "/:roomId",
    element: <RoomPage />,
    loader: () => <div>LOADING</div>,
  },
]);