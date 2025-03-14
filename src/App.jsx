import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "./components/global/Navbar";
import Footer from './components/global/Footer';
import Home from "./routes/Home";
import History from "./routes/History";
import Report from "./routes/Report";

// Layout Component
const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer/>
  </>
);

// Define Routes
const routes = [
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
        path:"/report",
        element:<Report/>
      }
    ],
  },
];

// Create Router
export const AppRouter = createBrowserRouter(routes);

