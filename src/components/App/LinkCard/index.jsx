import { Button } from "@/components/ui/button";
import { Clipboard, Download, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

function LinkCard({ url, fetchUrls }) {
    const handleCopy = () => {
        navigator.clipboard.writeText(
            `https://localhost:5173/${url.short_url}`
        );
    };

    return (
        <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-100 rounded-lg">
            <img
                src={url.qr}
                alt="qr code"
                className="h-32 object-contain ring ring-blue-500 self-start"
            />

            <Link to={`/link/${url.id}`} className="flex flex-col flex-1">
                <span className="text-3xl font-extrabold hover:underline cursor-pointer">
                    {url.title}
                </span>
                <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
                    https://localhost:5173/
                    {url?.custom_url ? url.custom_url : url.short_url}
                </span>
                <span>{url?.original_url}</span>
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
                                <Button>
                                    <Clipboard />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Copy URL</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button onClick>
                                    <Download />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Download QR</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button>
                                    <Trash2 />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Delete URL</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
            </div>
        </div>
    );
}

export default LinkCard;
