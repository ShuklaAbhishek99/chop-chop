import { useFetch } from "@/hooks/useFetch";
import { storeClicks } from "@/supabase/db/clicks";
import { getLongUrl } from "@/supabase/db/urls";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

function RedirectLink() {
    const { id } = useParams();

    const {
        loading: longUrlLoading,
        data,
        fn: longUrlFn,
    } = useFetch(getLongUrl, id);

    const { loading: storeClicksLoading, fn: storeClicksFn } = useFetch(
        storeClicks,
        {
            id: data?.id,
            originalUrl: data?.original_url,
        }
    );

    useEffect(() => {
      console.log(id);
      
        longUrlFn();
    }, []);

    useEffect(() => {
        if (!longUrlLoading && data) {
            storeClicksFn();
        }
    }, [longUrlLoading]);

    if (longUrlLoading || storeClicksLoading) {
        return (
            <div>
                <BarLoader width={"100%"} />
                <br />

                <h1 className="text-3xl font-extrabold">Redirecting...</h1>
            </div>
        );
    }

    return null;
}

export default RedirectLink;
