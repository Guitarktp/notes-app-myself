import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./pages/signup";
import Login from "./pages/login";


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
                  <SignUp />
                </>
              ),
            },
            {
              path: "/login",
              element: (
                <>
                  <Navbar />
                  <Login />
                </>
              ),
            },
            
    ])

return (
    
    <RouterProvider router={router} />
    
  );
};

export default App;