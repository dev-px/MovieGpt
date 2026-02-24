import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/API/firebase";
import { removeUserInfo } from "../utils/store/userSlice";
import { lang, NTLFX_Logo } from './../utils/Constant';
import { useLocation, useNavigate } from "react-router-dom";
import { setUserPreferredLanguage } from "../utils/store/appPrefernceSlice";
import { resetMovieSate } from "../utils/store/movieSlice";
import { toast } from "react-toastify";
import { toastVisibilty, translator } from "../utils/Helper";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [gptButtonHide, setGptButtonHide] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const langPref = useSelector((state) => state?.appPrefernce.language);

  // handle user sign out
  const handleSignOut = () => {
    signOut(auth).then(() => {
      toast.success("Signed out successfully", toastVisibilty);
      dispatch(removeUserInfo());
      dispatch(setUserPreferredLanguage("en"));
      dispatch(resetMovieSate());
    })
      .catch(() => {
        // navigate to error page or show error message
        toast.error("Error signing out", toastVisibilty);
      });
  };

  // handle logo click to navigate user to login page if not logged in and to browse page if logged in
  const handleLogoClick = () => {
    if (user) {
      navigate("/browse");
    } else {
      navigate("/login");
    }
  };

  // hide gpt search button on browse page only
  useEffect(() => {
    pathname === "/login" ? setGptButtonHide(false) : setGptButtonHide(true);
  }, [pathname]);

  return (
    <header className="absolute bg-gradient-to-b from-black to-transparent w-full z-50" >
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 lg:px-12 py-3 gap-3 sm:gap-0">

        {/* Netflix Logo */}
        <h1 className="text-red-600 font-extrabold text-xl sm:text-2xl cursor-pointer" onClick={handleLogoClick}>
          MovieGpt
        </h1>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 relative">

          {user && user.length !== 0 && (
            <div className="flex items-center gap-3 sm:gap-4">

              {gptButtonHide && (
                <button
                  className="border border-white text-white text-sm sm:text-base px-3 py-1.5 rounded-md hover:bg-white hover:text-black transition"
                  onClick={() => navigate("/search")}
                >
                  {translator(langPref, "AI Recommendation")}
                </button>
              )}

              {/* Profile */}
              <div
                className="text-white font-bold cursor-pointer relative flex gap-1 items-center text-sm sm:text-base"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                {user?.name}
                <span className="text-xs">∨</span>
              </div>

              {showProfileDropdown && (
                <div
                  onClick={handleSignOut}
                  className="absolute top-10 right-1/4 bg-white text-black text-sm rounded-sm px-3 py-1 font-semibold hover:opacity-80 transition"
                >
                  {translator(langPref, "Sign Out")}
                </div>
              )}
            </div>
          )}

          {/* Language Selection */}
          <select
            className="text-white bg-transparent font-bold p-1 border border-white rounded-md text-sm sm:text-base cursor-pointer"
            value={langPref}
            onChange={(e) =>
              dispatch(setUserPreferredLanguage(e.target.value))
            }
          >
            {Object.entries(lang).map(([key, value]) => (
              <option
                key={`${key}-${value}`}
                value={key}
                className="text-black"
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
