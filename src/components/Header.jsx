import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/Firebase";
import { removeUserInfo } from "../utils/userSlice";
import { NTLFX_Logo } from "../utils/constant";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        dispatch(removeUserInfo());
      })
      .catch((error) => {
        // navigate to error page or show error message
        console.log("Error signing out:", error);
      });
  };
  return (
    <header className="absolute bg-gradient-to-b from-black to-transparent w-full z-50">
      <div className="flex justify-between items-center">
        <img src={NTLFX_Logo} alt="Netflix Logo" className="h-22 !ml-12" />
        {user && user.length != 0 && (
          <div className="text-white text-xl font-bold !mr-12 flex items-center gap-6">
            <div>{user?.name}</div>
            <div onClick={handleSignOut}>Sign Out</div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
