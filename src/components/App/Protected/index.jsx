import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlState } from "@/context/useUrlState";
import { BarLoader } from "react-spinners";

export default function Protected({ children }) {
    const { loading, isAuthenticated } = useUrlState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && loading === false) navigate("/auth");
    }, [isAuthenticated, loading]);

    if (loading) return <BarLoader width={"100%"} color="green" />;

    if (isAuthenticated) return children;
}
