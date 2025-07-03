import { createBrowserRouter, redirect } from "react-router-dom";

// COMPONENTS
import Login from "./components/Login";
import Signup from "./components/Signup";

//LOADERS
import { authLoader } from "./loaders/authLoader";
import { devAuthLoader } from "./loaders/devAuthLoader";

// PAGES
import PublicDashboard from "./pages/PublicDashboard";
import PrivateDashboard from "./pages/PrivateDashboard";
import PetDetails from "./pages/PetDetails";
import DeveloperDashboard from "./pages/DeveloperDashboard";

// Optional auth checker
async function checkAuth() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Not authenticated");
    }
    return null;
  } catch {
    throw redirect("/public-dashboard");
  }
}
import MyPetDetails from "./pages/MyPetDetails"
import EditPet from "./pages/EditPet";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/public-dashboard",
    element: <PublicDashboard />,
  },
  {
    path: "/private-dashboard",
    element: <PrivateDashboard />,
  },
  {
    path: "/pets/:id",
    element: <PetDetails />,
  },
  {
    path: "/dashboard",
    element: <DeveloperDashboard />,
  },
]);


export default router;
