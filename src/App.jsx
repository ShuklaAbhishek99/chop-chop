import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import UrlProvider from "./context/UrlProvider";

function App() {
    return (
        <UrlProvider>
            <RouterProvider router={router} />
        </UrlProvider>
    );
}

export default App;
