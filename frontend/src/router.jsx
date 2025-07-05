import { createBrowserRouter, redirect } from "react-router";

//COMPONENTS
import Login from "./components/Login";
import Signup from "./components/Signup";
import DevLogin from "./components/DevLogin";
import DevSignup from "./components/DevSignup";

//LOADERS
import { authLoader } from "./loaders/authLoader";

//LAYOUTS
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";

//PAGES
import PublicDashboard from "./pages/PublicDashboard";
import PrivateDashboard from "./pages/PrivateDashboard";
import PetDetails from "./pages/PetDetails";
import MyPetDetails from "./pages/MyPetDetails"
import EditPet from "./pages/EditPet";
import AdoptedPets from "./pages/AdoptedPets"
import AddPet from "./pages/AddPet";
import DeveloperDashboard from "./pages/DeveloperDashboard"

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <PublicLayout />,
            children: [
                {
                    index: true,
                    element: <PublicDashboard />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "signup",
                    element: <Signup />,
                },
                {
                    path: "pets/:id",
                    element: <PetDetails />,
                },
            ]
        },
        {
            path: "/private-dashboard",
            element: <PrivateLayout />,
            loader: authLoader,
            children: [
                {
                    index: true,
                    element: <PrivateDashboard />,
                },
                {
                    path: "adopted-pets",
                    element: <AdoptedPets />,
                },
                {
                    path: "pets/mine/:id",
                    element: <MyPetDetails />,
                },
                {
                    path: "pets/mine/add",
                    element: <AddPet />,
                },
                {
                    path: "pets/mine/:id/edit",
                    element: <EditPet />,
                },

            ]
        },
        {
            path: "/dev",
            // element: <PrivateLayout />, ==>>> THISSSSSSSSSS
            // loader: authLoader,
            children: [
                {
                    path: "dashboard",
                    element: <DeveloperDashboard />,
                },
                {
                    path: "login",
                    element: <DevLogin />,
                },
                {
                    path: "signup",
                    element: <DevSignup />,
                },

            ]
        },
    ]
)

export default router;
