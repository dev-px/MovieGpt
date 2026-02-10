import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login.jsx";
import Browse from "./components/Browse.jsx";
import GptSearch from "./components/GptSearch.jsx";
import ProtectedLayout from './utils/ProtectedLayout';
// import { onAuthStateChanged } from "firebase/auth";
// import { addUserInfo, removeUserInfo } from "./utils/store/userSlice.js";
// import { resetMovieSate } from "./utils/store/movieSlice.js";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { auth } from "./utils/Firebase.js";

// import NotFound from './components/';
import AuthLayout from './utils/AuthWrapper';

// const router = createBrowserRouter([
//   {
//     path: "/", element: <Login />,
//   },
//   {
//     path: "/login", element: <Login />,
//   },
//   {
//     element: <Auth />,
//     children: [
//       { path: "/browse", element: <Browse /> },
//       { path: "/search", element: <GptSearch /> },
//     ],
//   }
// ]);

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

// If a route has children, its component must render <Outlet /> that's why
// we have used <Outlet /> in both AuthWrapper.jsx and ProtectedLayout.jsx

// Means all child routes defined under these components in App.jsx will be rendered where <Outlet /> is placed
// Each element or layout component is responsible for rendering its child routes using the <Outlet /> component from react-router-dom.