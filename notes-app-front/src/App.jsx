import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import { UserProvider } from "./contextComponents/userContext";
import NoteCard from "./components/NoteCard";
import EmptyCard from "./components/EmptyCard";
import AddEditNotes from "./pages/addEditNotes";
import Home from "./pages/home";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
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
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
