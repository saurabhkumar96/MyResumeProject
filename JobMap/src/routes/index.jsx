import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import ErrorPage from "../components/ErrorPage";
import Test from "../pages/Test";



export const router = createBrowserRouter([
    {
        index: true,
        element: <Home/>,
        errorElement: <h1>not found</h1>
    },
    {
        path: "test",
        element: <Test/>,
        errorElement: <h1>not found</h1>
    },
    {
        path: "*",
        element: <ErrorPage />
    },


])