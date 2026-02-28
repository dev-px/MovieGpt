import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

const AppLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default AppLayout;

// This AppLayout component is a simple layout component that includes a Header and an Outlet.
// The Outlet component is used to render the child routes defined in the router configuration.
// This means that any route defined under AppLayout in the router will have access to the Header and will be rendered within this layout.