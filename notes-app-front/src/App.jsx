import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
    const router = createBrowserRouter([
            {
              path: "/",
              element: (
                <>
                  <Navbar />
                </>
              ),
            },
            {
              path: "/signup",
              element: (
                <>
                  <Navbar />
                </>
              ),
            },
            {
              path: "/login",
              element: (
                <>
                  <Navbar />
                </>
              ),
            },
            
    ])

return (
    
    <RouterProvider router={router} />

  );
};

export default App;