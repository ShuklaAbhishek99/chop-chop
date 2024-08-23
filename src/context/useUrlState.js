import { useContext } from "react";
import { UrlContext } from "./context";

export const useUrlState = () => {
    return useContext(UrlContext);
};
