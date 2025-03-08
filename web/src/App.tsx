import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
