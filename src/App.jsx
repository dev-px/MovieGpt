import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login.jsx";
import Browse from "./components/Browse.jsx";
import AuthLayout from "./utils/AuthWrapper.jsx";
import GptSearch from "./components/GptSearch.jsx";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/login", element: <Login /> },
      { path: "/browse", element: <Browse /> },
      { path: "/search", element: <GptSearch /> },
    ],
  },
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
