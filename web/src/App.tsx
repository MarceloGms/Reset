import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Auth from "./routes/Auth";
import WorkStation from "./routes/workStation";
import DashboardTecnico from "./routes/DashboardTecnico";
import DashboardLogistica from "./routes/DashboardLogistica";
import Definições from "./routes/Settings";
import ManageLocations from "./routes/ManageLocations";
import { useContext } from "react";
import type { JSX } from "react";
import { AuthContext } from "./context/authContext";
import NotFound from "./components/NotFound";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { currentUser } = useContext(AuthContext) as { currentUser: string };
  return !currentUser ? <Navigate to="/auth" /> : children;
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/workStation",
      element: (
        <RequireAuth>
          <WorkStation />
        </RequireAuth>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <RequireAuth>
          <DashboardTecnico />
        </RequireAuth>
      ),
    },
    {
      path: "/dashboardLogistica",
      element: (
        <RequireAuth>
          <DashboardLogistica />
        </RequireAuth>
      ),
    },
    {
      path: "/definições",
      element: (
        <RequireAuth>
          <Definições />
        </RequireAuth>
      ),
    },
    {
      path: "/locations",
      element: (
        <RequireAuth>
          <ManageLocations />
        </RequireAuth>
      ),
    },
    {
      path: "/",
      element: <Navigate to="/auth" />,
    },
    {
      path: "*", // Rota "catch-all" para páginas não encontradas
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
