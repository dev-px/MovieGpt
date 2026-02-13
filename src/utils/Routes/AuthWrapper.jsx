import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../API/firebase";
import { useDispatch } from "react-redux";
import { addUserInfo, removeUserInfo } from "../store/userSlice";
import { useEffect } from "react";
import { resetMovieSate } from "../store/movieSlice";
import Header from "../../components/Header";

export default function AuthLayout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(addUserInfo({ email: user.email, name: user.displayName }));
                navigate("/browse");
            } else {
                dispatch(removeUserInfo());
                dispatch(resetMovieSate());
                navigate("/login");
            }
        });
        // Cleanup subscription on unmount
        return () => unsub();
    }, [dispatch, navigate]);

    // renders ProtectedLayout OR login etc. based on route definition in App.jsx
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

// This AuthLayout component listens for Firebase authentication state changes and
// updates the Redux store with user information when the user logs in or removes it when the user logs out.

// It uses the Outlet component to render child routes defined in App.jsx.
// means all routes defined under AuthLayout in App.jsx will have access to this authentication logic.