import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login.jsx";
import Browse from "./components/Browse.jsx";
import AuthLayout from "./utils/AuthWrapper.jsx";
import GptSearch from "./components/GptSearch.jsx";
import NotFound from "./components/NotFound.jsx";
import ProtectedLayout from './utils/ProtectedLayout';

const router = createBrowserRouter([
  {
    path: "/", element: <Login />,
  },
  {
    path: "/login", element: <Login />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          { path: "/browse", element: <Browse /> },
          { path: "/search", element: <GptSearch /> },
        ],
      },
    ],
  },
  {
    path: "*", element: <NotFound />,
  }
]);



function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

// If a route has children, its component must render <Outlet /> that's why 
// we have used <Outlet /> in both AuthWrapper.jsx and ProtectedLayout.jsx

// Means all child routes defined under these components in App.jsx will be rendered where <Outlet /> is placed
// Each element or layout component is responsible for rendering its child routes using the <Outlet /> component from react-router-dom.