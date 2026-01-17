import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/Firebase";
import { removeUserInfo } from "../utils/userSlice";
import { lang, NTLFX_Logo, translateLang } from "../utils/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { setUserPreferredLanguage } from "../utils/appPrefernceSlice";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [gptButtonHide, setGptButtonHide] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const langPref = useSelector((state) => state?.appPrefernce.language);
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

  // hide gpt search button on browse page only
  useEffect(() => {
    pathname === "/browse" ? setGptButtonHide(true) : setGptButtonHide(false);
  }, [pathname]);

  return (
    <header className="absolute bg-gradient-to-b from-black to-transparent w-full z-50">
      <div className="flex justify-between items-center">
        <img
          src={NTLFX_Logo}
          alt="Netflix Logo"
          className="h-22 !ml-12 hover:cursor-pointer"
          onClick={() => navigate("/browse")}
        />

        <div className="flex items-center gap-4 !mr-16">
          {user && user.length != 0 && (
            <div className="flex items-center gap-4">
              {gptButtonHide ? (
                <div>
                  <button
                    className="border border-white text-white font-medium !px-2.5 !py-1.5 rounded-md ml-4 hover:bg-white hover:text-black hover:cursor-pointer"
                    onClick={() => navigate("/search")}
                  >
                    {translateLang[langPref]?.["What's Next?"]}
                  </button>
                </div>
              ) : null}
              <div
                className="text-white font-bold hover:cursor-pointer relative flex gap-1 items-center"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                {user?.name} <div className="text-xs">{"∨"}</div>
              </div>
              {showProfileDropdown && (
                <div
                  onClick={handleSignOut}
                  className="hover:cursor-pointer bg-white text-black text-sm rounded-sm !px-2 !py-1 font-semibold hover:opacity-70 transition absolute top-16 right-32 "
                >
                  {translateLang[langPref]?.["Sign Out"]}
                </div>
              )}
            </div>
          )}
          <select
            className="text-white font-bold p-1 !border-0 outline-0 hover:cursor-pointer"
            value={langPref}
            onChange={(e) => dispatch(setUserPreferredLanguage(e.target.value))}
          >
            {Object.entries(lang).map(([key, value]) => (
              <option
                key={`${key}-${value}`}
                value={key}
                className="text-white bg-black hover:cursor-pointer"
              >
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
