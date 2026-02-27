import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/API/firebase";
import { removeUserInfo } from "../utils/store/userSlice";
import { lang } from './../utils/Constant';
import { useLocation, useNavigate } from "react-router-dom";
import { setUserPreferredLanguage } from "../utils/store/appPrefernceSlice";
import { resetMovieSate } from "../utils/store/movieSlice";
import { toast } from "react-toastify";
import { toastVisibilty, translator } from "../utils/Helper";
import { IoIosArrowDown } from "react-icons/io";

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
        <h1 className="text-yellow-500 font-extrabold text-xl sm:text-2xl cursor-pointer" onClick={handleLogoClick}>
          MovieGpt
        </h1>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 relative">

          {user && user.length !== 0 && (
            <div className="flex items-center gap-3 sm:gap-4">

              {gptButtonHide && (
                <button
                  className="border font-medium border-yellow-500 cursor-pointer text-yellow-500 text-sm sm:text-base px-3 py-1.5 rounded-md hover:bg-yellow-500 hover:text-black transition"
                  onClick={() => navigate("/search")}
                >
                  {translator(langPref, "AI Recommendation")}
                </button>
              )}

              {/* Profile */}
              <div
                className="text-yellow-500 font-medium cursor-pointer relative text-sm sm:text-base flex justify-center items-center gap-1"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <span>{user?.name}</span>
                <span className="text-xs"><IoIosArrowDown className="text-yellow-500 font-bold" /></span>
              </div>

              {showProfileDropdown && (
                <div
                  onClick={handleSignOut}
                  className="absolute top-10 right-1/4 bg-yellow-500 text-black text-sm rounded-sm px-3 py-1 font-semibold hover:opacity-80 transition cursor-pointer"
                >
                  {translator(langPref, "Sign Out")}
                </div>
              )}
            </div>
          )}

          {/* Language Selection */}
          <select
            className="text-yellow-500 bg-transparent font-medium p-1 border border-yellow-500 rounded-md text-sm sm:text-base cursor-pointer"
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
