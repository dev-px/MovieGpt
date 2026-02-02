import { Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUserInfo, removeUserInfo } from "./store/userSlice";
import { useEffect } from "react";
import { resetMovieSate } from "./store/movieSlice";

export default function AuthLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(addUserInfo({ email: user.email, name: user.displayName }));
      } else {
        dispatch(removeUserInfo());
        dispatch(resetMovieSate());
      }
    });

    // Cleanup subscription on unmount
    return () => unsub();
  }, []);
  
  // renders ProtectedLayout OR login etc. based on route definition in App.jsx
  return <Outlet />;
}

// This AuthLayout component listens for Firebase authentication state changes and
// updates the Redux store with user information when the user logs in or removes it when the user logs out.

// It uses the Outlet component to render child routes defined in App.jsx.
// means all routes defined under AuthLayout in App.jsx will have access to this authentication logic.