import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUserInfo, removeUserInfo } from "../utils/userSlice";
import { useEffect } from "react";

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
                navigate("/login");
            }
        });

        return () => unsub();
    }, []);

    return <Outlet />;
}
