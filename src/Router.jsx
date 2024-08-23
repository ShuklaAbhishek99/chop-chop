import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Link from "./pages/Link";
import RedirectLink from "./pages/RedirectLink";

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/auth",
                element: <Auth />,
            },
            {
                path: "/link/:id",
                element: <Link />,
            },
            {
                path: "/:id",
                element: <RedirectLink />,
            },
        ],
    },
]);
