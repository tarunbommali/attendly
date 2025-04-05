import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import Home from "./routes/Home";
import History from "./routes/History";
import Report from "./routes/Report";
import Login from "./routes/Login";
import ProtectedRoute from "./components/global/ProtectedRoute";
import ScrollToTopButton from "./components/global/ScrollToTopButton";
// Layout Component
const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
    <ScrollToTopButton />
  </>
);

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
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/history",
        element: (
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        ),
      },
      {
        path: "/xlsx-report",
        element: (
          <ProtectedRoute>
            <Report />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

// Create Router
export const AppRouter = createBrowserRouter(routes);
