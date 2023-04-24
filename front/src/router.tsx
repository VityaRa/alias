import {
  createBrowserRouter,
} from "react-router-dom";
import { LoginPage } from "./pages/login/login";
import { RoomPage } from "./pages/room/room";
import { ErrorPage } from "./pages/error/error";
import { Page } from "./pages";
const Loader = () => <div>LOADING</div>

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Page Component={LoginPage} />,
    loader: Loader,
  },
  {
    path: "/:roomId",
    element: <Page Component={RoomPage} />,
    loader: Loader,
  },
  {
    path: "/error",
    element: <Page Component={ErrorPage} />,
    loader: Loader,
  },
]);