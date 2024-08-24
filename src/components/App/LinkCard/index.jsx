import { Button } from "@/components/ui/button";
import {
    Clipboard,
    ClipboardCheck,
    Download,
    Pen,
    Share2,
    Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { RWebShare } from "react-web-share";
import { useFetch } from "@/hooks/useFetch";
import { deleteUrl } from "@/supabase/db/urls";
import { BeatLoader } from "react-spinners";

function LinkCard({ url, fetchUrls }) {
    const [isCopy, setIsCopy] = useState(false);

    const { loading: deleteLoading, fn: deleteFn } = useFetch(
        deleteUrl,
        url?.id
    );

    const handleCopy = () => {
        navigator.clipboard.writeText(
            `https://localhost:5173/${url?.short_url || url?.custom_url}`
        );

        setIsCopy(true);
    };

    const downloadImage = () => {
        const imageUrl = url?.qr;
        const fileName = url?.title || "download";

        const anchor = document.createElement("a");
        anchor.href = imageUrl;
        anchor.download = fileName;

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };

    return (
        <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-100 rounded-lg">
            <div className="h-32 w-32">
                <img
                    src={url.qr}
                    alt="qr code"
                    className="h-32 object-contain ring ring-blue-500 self-start"
                />
            </div>

            <Link to={`/link/${url.id}`} className="flex flex-col flex-1">
                <span className="text-3xl font-extrabold hover:underline cursor-pointer">
                    {url.title}
                </span>
                <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
                    http://localhost:5173/
                    {url?.custom_url ? url.custom_url : url.short_url}
                </span>
                <span>{url?.original_url}</span>
                <span className="text-sm my-2">{url?.description}</span>
                <span className="flex items-end font-extralight text-sm flex-1">
                    {new Date(url?.created_at).toLocaleString([], {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </Link>
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
                                        deleteFn().then(() => fetchUrls())
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
                                        title: `Visit ${url?.title}`,
                                        url: `http://localhost:5173/${
                                            url?.custom_url
                                                ? url.custom_url
                                                : url.short_url
                                        }`,
                                        text: `${url?.description || ""}`,
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
    );
}

export default LinkCard;
