import { Tasks } from "./pages/tasks";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Tasks />,
  },
]);
