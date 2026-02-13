import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./utils/Routes/routes.jsx";
import Toast from "./components/Toast.jsx";

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <Toast />
    </>
  );
}

export default App;

// If a route has children, its component must render <Outlet /> that's why
// we have used <Outlet /> in both AuthWrapper.jsx and ProtectedLayout.jsx

// Means all child routes defined under these components in App.jsx will be rendered where <Outlet /> is placed
// Each element or layout component is responsible for rendering its child routes using the <Outlet /> component from react-router-dom.