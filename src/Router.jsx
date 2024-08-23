import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Link from "./pages/Link";
import RedirectLink from "./pages/RedirectLink";
import Protected from "./components/App/Protected";

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
                element: (
                    <Protected>
                        <Dashboard />
                    </Protected>
                ),
            },
            {
                path: "/auth",
                element: <Auth />,
            },
            {
                path: "/link/:id",
                element: (
                    <Protected>
                        <Link />
                    </Protected>
                ),
            },
            {
                path: "/:id",
                element: <RedirectLink />,
            },
        ],
    },
]);
