import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlState } from "@/context/useUrlState";
import { Progress } from "@/components/ui/progress";

export default function Protected({ children }) {
    const [progress, setProgress] = useState(13);
    const { loading, isAuthenticated } = useUrlState();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(80);
        }, 500);

        if (!isAuthenticated && loading === false) navigate("/auth");

        return () => clearInterval(timer);
    }, [isAuthenticated, loading]);

    if (loading) <Progress value={progress} />;

    if (isAuthenticated) children;
}
