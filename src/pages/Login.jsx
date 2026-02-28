import React, { useRef, useState } from "react";
import { userDetailsValidation } from "../utils/Validate";
import { auth } from "../utils/API/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo } from "../utils/store/userSlice";
import Background from "../components/Background";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { toastVisibilty, translator } from "../utils/Helper";

const Login = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const langPref = useSelector((state) => state?.appPrefernce.language);
  const dispatch = useDispatch();
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  // toggle between sign in and sign up form
  const handleSignUp = () => {
    setErrorMessage(null);
    setIsSignedUp(!isSignedUp);
  };

  // handle form submission for both sign in and sign up
  const handleSubmit = async (event) => {
    event.preventDefault();

    const err = userDetailsValidation(
      email.current.value,
      password.current.value
    );

    setErrorMessage(err);
    if (err) return;

    setBtnLoading(true);

    try {
      if (isSignedUp) {
        // Sign up functionality
        const userCredential = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);

        // Update profile with display name
        await updateProfile(userCredential.user, { displayName: fullName.current.value || "User" });

        const { email: userEmail, displayName } = userCredential.user;
        dispatch(addUserInfo({ email: userEmail, name: displayName, })
        );

        toast.success("Account created successfully", toastVisibilty);

        setIsSignedUp(false);
      } else {
        // Sign in functionality

        // Set persistence BEFORE login
        await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);

        const userCredential = await signInWithEmailAndPassword(auth, email.current.value, password.current.value);

        const user = userCredential.user;

        toast.success(`Welcome back ${user.displayName || ""}`, toastVisibilty);
      }

      setErrorMessage(null);

    } catch (error) {
      console.error("Auth Error:", error);

      if (isSignedUp) {
        toast.error("Failed to create account", toastVisibilty);
      } else {
        toast.error("Invalid email or password", toastVisibilty);
      }
    } finally {
      setBtnLoading(false);
    }
  };


  return (
    <div className="relative min-h-screen w-full">

      {/* Background */}
      <Background />

      {/* Form Wrapper */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 pt-24">
        <div className="w-full max-w-md rounded-sm bg-black/75 p-6 sm:p-8 md:p-10 text-yellow-500">
          <h1 className="mb-6 text-3xl sm:text-4xl font-bold">
            {isSignedUp ? `${translator(langPref, "Sign Up")}` : `${translator(langPref, "Sign In")}`}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            {isSignedUp && (
              <input
                type="text"
                ref={fullName}
                placeholder="John Doe"
                className="text-yellow-500 placeholder-gray-400 outline w-full rounded-sm bg-black/80 p-3 outline-gray-500 focus:outline-2 focus:outline-white"
              />
            )}


            {/* Email */}
            <div>
              <input
                type="email"
                ref={email}
                placeholder="john.doe@example.com"
                className="bg-black/80 p-3 text-yellow-500 w-full rounded-sm placeholder-gray-400 outline outline-gray-500 focus:outline-2 focus:outline-white"
              />
              {errorMessage?.email && (
                <p className="mt-1 text-sm font-semibold text-red-500">
                  {errorMessage.email}
                </p>
              )}
            </div>


            {/* Password */}
            <div>
              <input
                type="password"
                ref={password}
                placeholder="●●●●●●●●●●"
                className="w-full rounded-sm bg-black/80 p-3 text-yellow-500 placeholder-gray-400 outline outline-gray-500 focus:outline-2 focus:outline-white"
              />
              {errorMessage?.password && (
                <p className="mt-1 text-sm font-semibold text-red-500">
                  {errorMessage.password}
                </p>
              )}
            </div>


            {/* Action button sign-up / sign-in */}
            <button
              type="submit"
              className={`mt-4 w-full rounded-sm text-black bg-yellow-500 p-3 font-semibold hover:bg-yellow-600  ${btnLoading
                ? "bg-yellow-500/80 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
                }`}
              disabled={btnLoading}
            >
              {btnLoading ?
                (translator(langPref, "Loading")) :
                isSignedUp ? `${translator(langPref, "Sign Up")}` : `${translator(langPref, "Sign In")}`}
            </button>


            {/* Forgot password */}
            <p className="hover:underline text-center text-sm mt-2  cursor-pointer"
              onClick={() => navigate("/forgot-password")}>
              {translator(langPref, "Forgot password?")}
            </p>
          </form>


          {/* Remember me */}
          <div className="mt-4 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              id="remember"
              className="cursor-pointer h-4 w-4 accent-white"
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember" className="cursor-pointer">
              {translator(langPref, "Remember me")}
            </label>
          </div>


          {/* Toggle */}
          <p className="mt-6 text-sm text-gray-300">
            {isSignedUp ? `${translator(langPref, "Already have an account?")}` : `${translator(langPref, "New to Netflix?")}`}{" "}
            <span
              className="cursor-pointer font-semibold text-yellow-500 hover:underline"
              onClick={handleSignUp}
            >
              {isSignedUp ? `${translator(langPref, "Sign in now")}` : `${translator(langPref, "Sign up now.")}`}
            </span>
          </p>
        </div>
      </div>
    </div >
  );
};

export default Login;
