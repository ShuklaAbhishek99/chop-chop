import { useUrlState } from "@/context/useUrlState";
import { useFetch } from "@/hooks/useFetch";
import { getClicksforUrl } from "@/supabase/db/clicks";
import { deleteUrl, getUrl } from "@/supabase/db/urls";
import {
    Clipboard,
    ClipboardCheck,
    Download,
    LinkIcon,
    Pen,
    Share2,
    Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { RWebShare } from "react-web-share";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Location from "@/components/App/Stats/Location";
import Device from "@/components/App/Stats/Device";

function Link() {
    const { id } = useParams();
    const { user } = useUrlState();
    const navigate = useNavigate();
    const [isCopy, setIsCopy] = useState(false);

    const {
        data: urlData,
        loading: urlLoading,
        error: urlError,
        fn: urlFn,
    } = useFetch(getUrl, {
        id,
        user_id: user?.id,
    });

    const {
        data: clicksData,
        loading: clicksLoading,
        error: clicksError,
        fn: clicksFn,
    } = useFetch(getClicksforUrl, id);

    const { loading: deleteLoading, fn: deleteFn } = useFetch(deleteUrl, id);

    useEffect(() => {
        urlFn();
        clicksFn();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(
            `https://localhost:5173/${
                urlData?.short_url || urlData?.custom_url
            }`
        );

        setIsCopy(true);
    };

    const downloadImage = () => {
        const imageUrl = urlData?.qr;
        const fileName = urlData?.title || "download";

        const anchor = document.createElement("a");
        anchor.href = imageUrl;
        anchor.download = fileName;

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };

    if (urlError) {
        navigate("/dashboard");
    }

    let link = "";
    if (urlData) {
        link = urlData?.custom_url ? urlData?.custom_url : urlData?.short_url;
    }

    return (
        <div>
            {(urlLoading || clicksLoading || deleteLoading) && (
                <BarLoader width={"100%"} />
            )}

            <div className="flex flex-col gap-8 sm:flex-row justify-between">
                <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
                    <span className="text-6xl font-extrabold hover:underline cursor-pointer">
                        {urlData?.title}
                    </span>
                    <a
                        href={`${import.meta.env.VITE_SITE_URL}/${link}`}
                        target="_blank"
                        className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
                    >
                        {`${import.meta.env.VITE_SITE_URL}/${link}`}
                    </a>
                    <a
                        href={urlData?.original_url}
                        target="_blank"
                        className="flex items-center gap-1 hover:underline cursor-pointer"
                    >
                        <LinkIcon className="p-1 w-10 h-10" />
                        {urlData?.original_url}
                    </a>
                    <span>
                        {new Date(urlData?.created_at).toLocaleString([], {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                    <div className="w-full">
                        <img
                            src={urlData?.qr}
                            alt="qr code"
                            className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
                        />
                    </div>

                    <div>
                        <TooltipProvider>
                            <div className="flex gap-2">
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button onClick={handleCopy}>
                                            {isCopy ? (
                                                <ClipboardCheck />
                                            ) : (
                                                <Clipboard />
                                            )}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Copy Link</p>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button onClick={downloadImage}>
                                            <Download />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Download QR</p>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button
                                            onClick={() =>
                                                deleteFn().then(() =>
                                                    navigate("/dashboard")
                                                )
                                            }
                                        >
                                            {deleteLoading ? (
                                                <BeatLoader size={5} />
                                            ) : (
                                                <Trash2 />
                                            )}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Delete Link</p>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button>
                                            <Pen />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Edit Link</p>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <RWebShare
                                            data={{
                                                title: `Visit ${urlData?.title}`,
                                                url: `http://localhost:5173/${
                                                    urlData?.custom_url
                                                        ? urlData?.custom_url
                                                        : urlData?.short_url
                                                }`,
                                                text: `${
                                                    urlData?.description || ""
                                                }`,
                                            }}
                                        >
                                            <Button>
                                                <Share2 />
                                            </Button>
                                        </RWebShare>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Share Link</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </TooltipProvider>
                    </div>
                </div>

                <Card className="sm:w-3/5">
                    <CardHeader>
                        <CardTitle className="text-4xl font-extrabold">
                            Link Statistics
                        </CardTitle>
                    </CardHeader>
                    {clicksData && clicksData?.length ? (
                        <CardContent className="flex flex-col gap-6">
                            <Card>
                                <CardHeader>Total Clicks</CardHeader>
                                <CardContent>
                                    <p>{clicksData?.length}</p>
                                </CardContent>
                            </Card>

                            <CardTitle>Location Data</CardTitle>
                            <Location stats={clicksData} />
                            <CardTitle>Device Info</CardTitle>
                            <Device stats={clicksData} />
                        </CardContent>
                    ) : (
                        <CardContent>
                            {clicksLoading === false
                                ? "No statistics yet"
                                : "Loading statistics..."}
                        </CardContent>
                    )}
                </Card>
            </div>
        </div>
    );
}

export default Link;
