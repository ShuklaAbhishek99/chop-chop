import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Error from "@/components/App/Error";
import { useFetch } from "@/hooks/useFetch";
import { getUrls } from "@/supabase/db/urls";
import { useUrlState } from "@/context/useUrlState";
import { getClicks } from "@/supabase/db/clicks";
import LinkCard from "@/components/App/LinkCard";
import CreateLink from "@/components/App/CreateLink";

function Dashboard() {
    const [searchQuery, setSearchQuery] = useState("");

    const { user } = useUrlState();
    const {
        data: urlsData,
        loading: urlsLoading,
        error: urlsError,
        fn: urlsFn,
    } = useFetch(getUrls, user?.id);

    const {
        data: clicksData,
        loading: clicksLoading,
        error: clicksError,
        fn: clicksFn,
    } = useFetch(
        getClicks,
        urlsData?.map((url) => url.id)
    );

    useEffect(() => {
        if (user?.id) {
            urlsFn(); // Fetch URLs
        }
    }, [user?.id]);

    useEffect(() => {
        if (urlsData?.length) {
            clicksFn();
        }
    }, [urlsData?.length]);

    const filterUrlsData = urlsData?.filter((url) =>
        url.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-8">
            {(clicksLoading || urlsLoading) && (
                <BarLoader width={"100%"} color="#000000" />
            )}
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Links Created</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{urlsData?.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Click</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{clicksData?.length}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-between">
                <h1 className="text-4xl font-extrabold">My Links</h1>
                <CreateLink />
            </div>

            <div className="relative">
                <Input
                    type="text"
                    placeholder="Search your links"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute top-2 right-2 p-1" />
            </div>
            {urlsError && <Error message={urlsError.message} />}
            {clicksError && <Error message={clicksError.message} />}

            {(filterUrlsData || []).map((url) => (
                <LinkCard key={url.id} url={url} fetchUrls={urlsFn} />
            ))}
        </div>
    );
}

export default Dashboard;
