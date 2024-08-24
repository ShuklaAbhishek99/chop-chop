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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { useUrlState } from "@/context/useUrlState";
import { useFetch } from "@/hooks/useFetch";
import { logout } from "@/supabase/auth";
import { BarLoader } from "react-spinners";

function Header() {
    const navigate = useNavigate();
    const { loading, fn: logoutFn } = useFetch(logout);
    const { user, fetchUser } = useUrlState();

    const handleLogout = () => {
        logoutFn().then(() => {
            fetchUser();
        });
        navigate("/");
    };

    return (
        <>
            <nav className="py-4 flex justify-between items-center">
                <Link to={"/"}>
                    <img src="/Logo.png" alt="chopchop logo" className="h-16" />
                </Link>

                <div>
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
                                <Avatar>
                                    <AvatarImage
                                        className="object-contain"
                                        src={
                                            user?.user_metadata?.profile_avatar
                                        }
                                    />
                                    <AvatarFallback>AS</AvatarFallback>
                                </Avatar>
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

            {loading && <BarLoader className="mb-4" width={"100%"} />}
        </>
    );
}

export default Header;
