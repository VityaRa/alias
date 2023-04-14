import {
  createBrowserRouter,
} from "react-router-dom";
import { LoginPage } from "./pages/login/login";
import { RoomPage } from "./pages/room/room";
import { ErrorPage } from "./pages/error/error";
import { Page } from "./pages";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Page Component={LoginPage} />,
    loader: () => <div>LOADING</div>,
  },
  {
    path: "/:roomId",
    element: <Page Component={RoomPage} />,
    loader: () => <div>LOADING</div>,
  },
  {
    path: "/error",
    element: <Page Component={ErrorPage} />,
    loader: () => <div>LOADING</div>,
  },
]);