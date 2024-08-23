import Header from "@/components/App/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function AppLayout() {
    return (
        <div>
            <main className="min-h-screen container">
                <Header />
                <Outlet />
            </main>

            <footer className="p-10 text-center dark:bg-gray-800 dark:text-white mt-10">
                Made with ❤ by Abhishek Shukla
            </footer>
        </div>
    );
}

export default AppLayout;
