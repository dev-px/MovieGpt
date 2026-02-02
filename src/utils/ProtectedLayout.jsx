import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const user = useSelector((state) => state.user);

  if (!user) return <Navigate to="/login" replace />;

  // renders Browse, Search, etc. when user is authenticated
  return <Outlet />;
};

export default ProtectedLayout;


// here outlet will render the child routes defined in App.jsx under this ProtectedLayout
// means when user is authenticated then only render the child routes like /browse and /search otherwise redirect to /login page
// "replace" prop is used to prevent going back to protected route after redirecting to login page
// mean if user try to go back after redirecting to login page then it will not go back to protected route
// we are checking user state from redux store to know if user is authenticated or not