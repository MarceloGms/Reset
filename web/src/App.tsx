import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import WorkStation from "./routes/workStation";

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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
