import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import {routes} from "./routes.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import HomeLayout from "./layout/HomeLayout.jsx";
import {About, Cocktail, Error, Landing, Newsletter, SingleErrorPage} from "./pages/index.js";
import {loader as landingLoader} from "./pages/Landing.jsx";
import {loader as singleCocktailLoader} from "./pages/Cocktail.jsx";
import {action as newsletterAction} from "./pages/Newsletter.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        staleTime: 1000 * 60 * 5,
    }
})

const routes = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                loader: landingLoader(queryClient),
                errorElement: <SingleErrorPage />,
                element: <Landing />
            },
            {
                path: "cocktail/:id",
                errorElement: <SingleErrorPage />,
                loader: singleCocktailLoader(queryClient),
                element: <Cocktail />,
            },
            {
                path: "newsletter",
                element: <Newsletter />,
                action: newsletterAction,
                errorElement: <SingleErrorPage />,
            },
            {
                path: "about",
                element: <About />,
                errorElement: <SingleErrorPage />,
            },
        ]
    },

    {
        path: "*",
        element: <Error />,
    }
]);

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={routes} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};


export default App;
