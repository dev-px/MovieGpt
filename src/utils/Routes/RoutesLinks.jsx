import { createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";
import Browse from "../../pages/Browse";
import GptSearch from "../../pages/GptSearch";
import AuthWrapper from "./AuthWrapper";
import NotFound from "../../pages/NotFound";
import ForgotPassword from "../../pages/ForgotPassword";
import RouteErrorElement from "../../error/RouteErrorElement";
import MovieDetails from "../../pages/MovieDetails";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from './ProtectedRoute';
import AppLayout from "./AppLayout";

const router = createBrowserRouter([
    {
        element: <AuthWrapper />,
        errorElement: <RouteErrorElement />,
        children: [
            {
                element: <AppLayout />, // Header always visible
                children: [
                    // Public routes
                    {
                        element: <PublicRoute />,
                        children: [
                            { index: true, element: <Login /> },
                            { path: "login", element: <Login /> },
                            { path: "forgot-password", element: <ForgotPassword /> },
                        ],
                    },

                    // Protected routes
                    {
                        element: <ProtectedRoute />,
                        children: [
                            { path: "browse", element: <Browse /> },
                            { path: "search", element: <GptSearch /> },
                            { path: "movie/:title/:movieId", element: <MovieDetails /> },
                        ],
                    },
                ],
            },
        ],
    },
    { path: "*", element: <NotFound /> },
]);
export default router;
// index: true means that this route will be rendered when the path is exactly the same as the parent route. In this case, when the path is exactly "/", the Login component will be rendered.
// It is a shorthand for defining a route with an empty path and setting it as the default route for its parent.

// Error element vs not found element
// errorElement is used to define a component that will be rendered when an error occurs while rendering the route.
// In this case, if any error occurs while rendering the AuthWrapper or its child routes, the RouteErrorElement component will be rendered instead of crashing the entire app. This allows us to handle errors and provide a better UX.
// Not found is not same as error element because not found is for handling 404 errors when the user tries to access a route that does not exist,
// while error element is for handling any other type of error that may occur during the rendering of a route. Not found is a specific case of an error, but error element can handle a wider range of errors.