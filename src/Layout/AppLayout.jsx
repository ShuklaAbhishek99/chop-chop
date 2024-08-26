import { DockSocials } from "@/components/App/Animations/Dock";
import Header from "@/components/App/Header";
import { Heart } from "lucide-react";
import { Outlet } from "react-router-dom";

function AppLayout() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <main className="flex-grow">
                <Header />
                <Outlet />
            </main>

            <footer className="px-10 pb-32 text-center mt-10 flex justify-center md:justify-end container">
                Made with
                <span className="mx-2">
                    <Heart className="text-red-500 fill-red-500" />
                </span>
                by Abhishek Shukla
            </footer>

            <div className="flex justify-center">
                <div className="fixed bottom-10">
                    <DockSocials />
                </div>
            </div>
        </div>
    );
}

export default AppLayout;
