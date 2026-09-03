import { createBrowserRouter } from "react-router";
import { PATHS } from "./paths";
import Home from "../pages/Home";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    }
])