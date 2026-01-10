import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/Firebase";
import { removeUserInfo } from "../utils/userSlice";

const Header = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log("User signed out successfully");
            dispatch(removeUserInfo());
        }).catch((error) => {
            console.log("Error signing out:", error);
        })
    }
    return (
        <header className="absolute bg-gradient-to-b from-black to-transparent w-full z-50">
            <div className="flex justify-between items-center">
                <img
                    src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                    alt="Netflix Logo"
                    className="h-22 !ml-12"
                />
                {user && user.length != 0 && (<div className="text-white text-xl font-bold !mr-12">
                    <h1>{user?.name}</h1>
                    <h4 onClick={handleSignOut}>Sign Out</h4>
                </div>)}
            </div>
        </header>
    );
};

export default Header;