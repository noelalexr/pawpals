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
    ]
)

export default router;
