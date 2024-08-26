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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AnimatedListComp from "@/components/App/Animations/AnimationList";
import PulsatingButton from "@/components/ui/pulsating-button";
import WordPullUp from "@/components/magicui/word-pull-up";

function LandingPage() {
    const [longUrl, setLongUrl] = useState();
    const navigate = useNavigate();

    const companies = [
        "Google",
        "Microsoft",
        "Amazon",
        "Netflix",
        "YouTube",
        "Instagram",
        "Uber",
        "Spotify",
    ];

    const handleShorten = (e) => {
        e.preventDefault();

        if (longUrl) {
            navigate(`/auth?createNew=${longUrl}`);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-1/2 mt-10">
                <div className="mb-10 sm:mb-16">
                    <h2 className="mb-3 text-3xl sm:text-6xl lg:text-7xl text-center font-extrabold">
                        <WordPullUp
                            className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
                            words="The Ultimate URL Shortener"
                        />
                    </h2>
                    <div className="text-center text-sm sm:text-xl">
                        Shorten links. Track clicks. Gain insights.
                    </div>
                </div>

                <form
                    onSubmit={handleShorten}
                    className="flex flex-col sm:flex-row sm:h-14 w-full gap-2"
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
            </div>

            <Card className="mt-12 text-center py-2 rounded-3xl w-3/4 border-none shadow-sm bg-[#FAF8F0] dark:bg-[#0f0f0f]">
                <CardHeader>
                    <CardTitle className="my-1 md:text-5xl sm:text-3xl font-extrabold">
                        Shorten Links, Share with Ease
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-lg">
                        <p>
                            Empower your audience with simple, shareable links.
                            With ChopChop, creating and managing URLs is a
                            breeze. Track clicks, analyze engagement, and
                            optimize your online presence—all in just a few
                            clicks.
                        </p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full dark:invert">
                        <img
                            src="/CreatePreview.png"
                            alt="create preview"
                            className="mx-auto shadow-lg rounded-3xl"
                        />
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-12 text-center py-2 rounded-3xl w-3/4 border-none shadow-sm bg-[#FAF8F0] dark:bg-[#0f0f0f]">
                <CardHeader>
                    <CardTitle className="my-1 md:text-5xl sm:text-3xl font-extrabold">
                        Manage Your Links, Effortlessly
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-lg">
                        <p>
                            Stay on top of your game with ChopChop&apos;s
                            intuitive dashboard. Monitor your link performance,
                            track engagement, and manage everything from one
                            central hub. Simplifying your workflow has never
                            been easier.
                        </p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full dark:invert">
                        <img
                            src="/Dashboard.png"
                            alt="create preview"
                            className="mx-auto p-3 pb-2 shadow-lg rounded-3xl bg-gray-100"
                        />
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-12 text-center py-2 rounded-3xl w-3/4 border-none shadow-sm bg-[#FAF8F0] dark:bg-[#0f0f0f]">
                <CardHeader>
                    <CardTitle className="my-1 md:text-5xl sm:text-3xl font-extrabold">
                        Know Your Audience, Globally
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-lg">
                        <p>
                            See where your clicks are coming from with detailed
                            location charts. ChopChop gives you the insights you
                            need to understand your audience&apos;s geographic
                            distribution, helping you tailor your content to
                            their needs.
                        </p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full dark:invert">
                        <img
                            src="/LineChart.png"
                            alt="create preview"
                            className="mx-auto shadow-lg rounded-3xl"
                        />
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-12 text-center py-2 rounded-3xl w-3/4 border-none shadow-sm bg-[#FAF8F0] dark:bg-[#0f0f0f]">
                <CardHeader>
                    <CardTitle className="my-1 md:text-5xl sm:text-3xl font-extrabold">
                        Understand Device Usage, Optimize Content
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-lg">
                        <p>
                            Track clicks by device type to see how your audience
                            is interacting with your content. Whether it&apos;s
                            mobile, tablet, or desktop, ChopChop provides the
                            data you need to optimize your links for all
                            platforms.
                        </p>
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-sm sm:text-lg">
                    <div className="w-full dark:invert">
                        <img
                            src="/PieChart.png"
                            alt="create preview"
                            className="mx-auto shadow-lg rounded-3xl"
                        />
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-12 text-center py-2 rounded-3xl w-3/4 border-none shadow-sm bg-[#FAF8F0] dark:bg-[#0f0f0f]">
                <CardHeader>
                    <CardTitle className="my-1 md:text-5xl sm:text-3xl font-extrabold">
                        Trusted by Leading Companies
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-lg">
                        <p>
                            Join the ranks of successful businesses that rely on
                            ChopChop for their link management needs. With
                            powerful features and easy-to-use tools, it's no
                            wonder companies trust us to simplify their online
                            presence.
                        </p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <section id="companies w-full">
                        <div className="container mx-auto px-4 md:px-8">
                            <div className="relative mt-6">
                                <div className="grid grid-cols-2 place-items-center gap-2 md:grid-cols-4 xl:grid-cols-8 xl:gap-4">
                                    {companies.map((logo, idx) => (
                                        <img
                                            key={idx}
                                            src={`https://cdn.magicui.design/companies/${logo}.svg`}
                                            className="h-10 w-40 px-2 dark:brightness-0 dark:invert"
                                            alt={logo}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </CardContent>
            </Card>

            <AnimatedListComp
                className={"my-6 border-none bg-[#FAF8F0] dark:bg-[#0f0f0f]"}
            />
            <PulsatingButton
                className={"bg-primary text-black"}
                onClick={() => navigate("/auth")}
            >
                Get Started Today
            </PulsatingButton>

            <div id="faq" className="container my-6">
                <h2 className="font-bold text-3xl text-center my-2">FAQs</h2>
                <Accordion
                    type="multiple"
                    collapsible
                    className="w-full md:px-11"
                >
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            How does ChopChop shorten URLs?
                        </AccordionTrigger>
                        <AccordionContent>
                            When you input a long URL, ChopChop instantly
                            generates a concise, shareable link. This shortened
                            URL redirects users to the original destination with
                            just one click.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                            Do I need to create an account to use ChopChop?
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes, an account is required. Signing up allows you
                            to track your links, access detailed analytics, and
                            customize your short URLs for better branding and
                            control.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>
                            What kind of analytics does ChopChop offer?
                        </AccordionTrigger>
                        <AccordionContent>
                            ChopChop provides comprehensive analytics, including
                            click counts, geographic data on where your audience
                            is located, and the types of devices (mobile or
                            desktop) they use to access your links.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}

export default LandingPage;
