import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import WorkStation from "./routes/workStation";
import DashboardTecnico from "./routes/DasboardTecnico";
import PedidoDePecas from "./routes/pedidoPecas";
import DashboardLogistica from "./routes/DashboardLogistica";
import Definições from "./routes/Settings";

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
      element: <WorkStation />,
    },
    {
      path: "/dashboard",
      element: <DashboardTecnico />,
    },
    {
      path: "/dashboardLogistica",
      element: <DashboardLogistica />,
    },
    {
      path: "/minhas-pecas",
      element: <PedidoDePecas />,
    },
    {
      path: "/definições",
      element: <Definições />,
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
