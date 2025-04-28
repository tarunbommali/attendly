import { createBrowserRouter } from "react-router-dom";
import History from "./routes/History";
import Report from "./routes/Report";
import Login from "./routes/Login";

import { AppLayout } from "./AppLayout";

import Home from "./routes/Home";

// Define Routes
const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/xlsx-report/:tabId?",
        element: <Report />,
      },
    ],
  },
];

// Create Router
export const AppRouter = createBrowserRouter(routes);
