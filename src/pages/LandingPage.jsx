import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const [longUrl, setLongUrl] = useState();
    const navigate = useNavigate();

    const handleShorten = (e) => {
        e.preventDefault();

        if (longUrl) {
            navigate(`/auth?createNew=${longUrl}`);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl dark:text-white text-center font-extrabold">
                The Ultimate URL Shortener <br /> you&apos;ll ever need
            </h2>

            <form
                onSubmit={handleShorten}
                className="flex flex-col md:w-1/2 sm:flex-row sm:h-14 w-full gap-2"
            >
                <Input
                    type="url"
                    placeholder="Enter your loooong URL"
                    className="h-full flex-1 py-4 px-4"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                />
                <Button type="submit" className="h-full">
                    Shorten !!
                </Button>
            </form>
            {/* Banner image */}

            <Accordion type="multiple" collapsible className="w-full md:px-11">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        How does the Trimrr URL shortener works?
                    </AccordionTrigger>
                    <AccordionContent>
                        When you enter a long URL, our system generates a
                        shorter version of that URL. This shortened URL
                        redirects to the original long URL when accessed.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        Do I need an account to use the app?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes. Creating an account allows you to manage your URLs,
                        view analytics, and customize your short URLs.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        What analytics are available for my shortened URLs?
                    </AccordionTrigger>
                    <AccordionContent>
                        You can view the number of clicks, geolocation data of
                        the clicks and device types (mobile/desktop) for each of
                        your shortened URLs.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default LandingPage;
