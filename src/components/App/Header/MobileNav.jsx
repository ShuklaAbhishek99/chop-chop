import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

function MobileNav({ isOpen, onClose }) {
    if (!isOpen) return null;

    return createPortal(
        <div
            className="close-outer fixed top-0 left-0 right-0 bottom-0 z-[1000] bg-zinc-900 bg-opacity-50 flex"
            onClick={(e) => {
                e.stopPropagation();
                onClose();
            }}
        >
            <div className="bg-white dark:bg-black opacity-100 p-2 z-50 shadow-lg relative min-w-[57%] text-black dark:bg-twitter-lightsout-bg dim:bg-twitter-dim-bg dark:text-white dim:text-white">
                <div className="m-2">
                    <button
                        className="rounded-lg absolute top-2.5 right-2.5 bg-none border-none text-2xl cursor-pointer"
                        onClick={onClose}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-7 dark:fill-white dim:fill-white fill-black r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                        >
                            <g>
                                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
                <br />

                <div className="flex flex-col gap-3 font-semibold mx-6">
                    <Link to={"/faq"} className="hover:underline">
                        FAQ
                    </Link>
                    <Link
                        to={"https://abhishekshukla.xyz"}
                        target="_blank"
                        className="hover:underline"
                    >
                        View My Portfolio
                    </Link>
                </div>
            </div>
        </div>,
        document.getElementById("modal")
    );
}

export default MobileNav;
