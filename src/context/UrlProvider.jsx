import { useFetch } from "@/hooks/useFetch";
import { getCurrentUser } from "@/supabase/auth";
import { useEffect } from "react";
import { UrlContext } from "./context";

export default function UrlProvider({ children }) {
    const {
        data: user,
        loading,
        error,
        fn: fetchUser,
    } = useFetch(getCurrentUser);

    const isAuthenticated = user?.role === "authenticated";

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UrlContext.Provider
            value={{ user, loading, fetchUser, isAuthenticated, error }}
        >
            {children}
        </UrlContext.Provider>
    );
}
