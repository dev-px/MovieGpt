import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const user = useSelector((state) => state.user);

    if (user) {
        return <Navigate to="/browse" replace />;
    }

    return <Outlet />;
}

export default PublicRoute;

// This PublicRoute component checks if the user is authenticated by accessing the user state from the Redux store.
// If the user is authenticated, it redirects them to the "/browse" route using the Navigate component from react-router-dom.
// If the user is not authenticated, it renders the child routes defined under PublicRoute in App.jsx using the Outlet component.