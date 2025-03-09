import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import WorkStation from "./routes/workStation";
import DashboardTecnico from "./routes/DashboardTecnico";
import DashboardLogistica from "./routes/DashboardLogistica";
import Definições from "./routes/Settings";
import ManageLocations from "./routes/ManageLocations";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
// import { AuthProvider } from "./components/AuthContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/workStation",
      element: (
        <ProtectedRoute>
          <WorkStation />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        // <ProtectedRoute>
        //   <DashboardTecnico />
        // </ProtectedRoute>
        <DashboardTecnico />
      ),
    },
    {
      path: "/dashboardLogistica",
      element: (
        // <ProtectedRoute>
        //   <DashboardLogistica />
        // </ProtectedRoute>
        <DashboardLogistica />
      ),
    },
    {
      path: "/definições",
      element: (
        // <ProtectedRoute>
        //   <Definições />
        // </ProtectedRoute>
        <Definições />
      ),
    },
    {
      path: "/locations",
      element: (
        // <ProtectedRoute>
        //   <ManageLocations />
        // </ProtectedRoute>
        <ManageLocations />
      ),
    },
    {
      path: "*", // Rota "catch-all" para páginas não encontradas
      element: <NotFound />,
    },
  ]);

  return (
    // <AuthProvider>
    //   <RouterProvider router={router} />
    // </AuthProvider>
    <RouterProvider router={router} />
  );
}

export default App;