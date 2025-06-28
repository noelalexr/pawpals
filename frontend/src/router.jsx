import { createBrowserRouter, redirect } from "react-router";

//COMPONENTS
import Login from "./components/Login";
import Signup from "./components/Signup";

//PAGES
import PublicDashboard from "./pages/PublicDashboard";
import PrivateDashboard from "./pages/PrivateDashboard";

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
        },
        {
            path: "/private-dashboard",
            // loader: checkAuth,
            element: <PrivateDashboard />,
        },
    ]
)

export default router;
