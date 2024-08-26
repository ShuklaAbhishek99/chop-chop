import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkIcon, LogOut, Menu, Moon, Sun } from "lucide-react";
import { useUrlState } from "@/context/useUrlState";
import { useFetch } from "@/hooks/useFetch";
import { logout } from "@/supabase/auth";
import { BarLoader } from "react-spinners";
import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";

function Header() {
    const navigate = useNavigate();
    const { loading, fn: logoutFn } = useFetch(logout);
    const { user, fetchUser } = useUrlState();
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const html = document.querySelector("html");
        html.classList.remove("light", "dark");

        if (theme) {
            html.classList.add(theme);
            localStorage.setItem("theme", theme);
        } else {
            const defaultTheme = "light";
            html.classList.add(defaultTheme);
            setTheme(defaultTheme);
            localStorage.setItem("theme", defaultTheme);
        }
    }, [theme]);

    const handleLogout = () => {
        logoutFn().then(() => {
            fetchUser();
        });
        navigate("/");
    };

    const handleThemeChange = () => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    return (
        <>
            <nav className="py-2 mx-2 sm:mx-6 grid grid-cols-12 items-center">
                <div className="hidden gap-3 col-span-2 lg:flex font-semibold">
                    <a href="/#faq" className="hover:underline">
                        FAQ
                    </a>
                    <Link
                        to={"https://abhishekshukla.xyz"}
                        target="_blank"
                        className="hover:underline"
                    >
                        View My Portfolio
                    </Link>
                </div>

                <div
                    className="hidden max-lg:block"
                    onClick={() => setIsOpen(true)}
                >
                    <Menu />
                </div>

                <Link
                    to={"/"}
                    className="flex gap-3 flex-wrap justify-center col-span-8 max-sm:justify-start"
                >
                    <img src="/Logo.png" alt="chopchop logo" className="h-16" />
                    <span className="my-auto text-xl max-sm:hidden permanent-marker-regular">
                        ChopChop
                        <span className="text-sm align-top">&reg;</span>
                    </span>
                </Link>

                <div className="flex gap-3 col-span-2 justify-self-end">
                    <Button
                        className="rounded-full p-2"
                        onClick={handleThemeChange}
                    >
                        {theme === "light" ? <Moon /> : <Sun />}
                    </Button>
                    {!user ? (
                        <Button
                            varient="outline"
                            onClick={() => navigate("/auth")}
                        >
                            Login
                        </Button>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                                <Button size="icon">
                                    <img
                                        className="min-w-[30px] min-h-[30px] rounded-full"
                                        alt="avatar"
                                        src={
                                            user?.user_metadata?.profile_avatar
                                        }
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    {user?.user_metadata?.name}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link to={"/dashboard"} className="flex">
                                        <LinkIcon className="mr-2 h-4 w-4" />
                                        My Links
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-red-500"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </nav>

            {loading && <BarLoader className="mb-4" width={"100%"} color="green" />}
            <MobileNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}

export default Header;
