import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import UrlProvider from "./context/context";

function App() {
    return (
        <UrlProvider>
            <RouterProvider router={router} />
        </UrlProvider>
    );
}

export default App;
