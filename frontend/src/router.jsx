import { createBrowserRouter, redirect } from "react-router";

//COMPONENTS
import Login from "./components/Login";
import Signup from "./components/Signup";

//LOADERS
import { authLoader } from "./loaders/authLoader";
import { devAuthLoader } from "./loaders/devAuthLoader";

//PAGES
import PublicDashboard from "./pages/PublicDashboard";
import PrivateDashboard from "./pages/PrivateDashboard";
import PetDetails from "./pages/PetDetails";
import MyPetDetails from "./pages/MyPetDetails"
import EditPet from "./pages/EditPet";
<<<<<<< HEAD
import AdoptedPets from "./pages/AdoptedPets";

//
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
=======
>>>>>>> c6d0c6fadd578c968b1dc6d96234ed20bdf811c8

const router = createBrowserRouter(
    [
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
            // loader: dashboardLoader,
        },
        {
            path: "/private-dashboard",
            // loader: checkAuth,
            element: <PrivateDashboard />,
            // loader: dashboardLoader,
        },
        {
            path: "/adopted-pets",
            // loader: checkAuth,
            element: <AdoptedPets />,
            // loader: dashboardLoader,
        },
        {
            path: "/pets/:id",
            // loader: checkAuth,
            element: <PetDetails />,
        },
        {
            path: "/pets/mine/:id",
            // loader: checkAuth,
            element: <MyPetDetails />,
        },
        {
            path: "/pets/mine/:id/edit",
            // loader: checkAuth,
            element: <EditPet />,
        },
<<<<<<< HEAD

=======
>>>>>>> c6d0c6fadd578c968b1dc6d96234ed20bdf811c8
    ]
)

export default router;
