import {
  createBrowserRouter,
} from "react-router-dom";
import { LoginPage } from "./pages/login/login";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    loader: () => <div>LOADING</div>,
  },
]);