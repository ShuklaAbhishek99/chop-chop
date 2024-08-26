import Login from "@/components/App/Login";
import SignUp from "@/components/App/SignUp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUrlState } from "@/context/useUrlState";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Auth() {
    const [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");
    const navigate = useNavigate();

    const { isAuthenticated, loading } = useUrlState();

    useEffect(() => {
        if (isAuthenticated && !loading) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
        }

        return () => {};
    }, [isAuthenticated, loading]);

    return (
        <div className="mt-36 flex flex-col items-center justify-center gap-10">
            <h1 className="text-3xl sm:text-5xl font-extrabold">
                {searchParams.get("createNew")
                    ? "Hold Up! Let's Login First."
                    : "Login / SignUp"}
            </h1>
            <Tabs defaultValue="login" className="sm:w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Login />
                </TabsContent>
                <TabsContent value="signup">
                    <SignUp />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default Auth;
