import React, { useRef, useState } from "react";
import { signInValidation } from "../utils/Validate";
import { auth } from "../utils/API/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
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
  const langPref = useSelector((state) => state?.appPrefernce.language);
  const dispatch = useDispatch();
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  // toggle between sign in and sign up form
  const handleSignUp = () => {
    setIsSignedUp(!isSignedUp);
  };

  // handle form submission for both sign in and sign up
  const handleSubmit = (event) => {
    event.preventDefault();
    const err = signInValidation(email.current.value, password.current.value);
    setErrorMessage(err);
    if (err) return;
    setBtnLoading(true);
    if (isSignedUp) {
      // sign up flow
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      ).then(() => {
        // update profile with full name after successful sign up
        updateProfile(auth.currentUser, {
          displayName: fullName.current.value,
        }).then(() => {
          const { email, displayName } = auth.currentUser;
          dispatch(addUserInfo({ email: email, name: displayName }));
          toast.success("Account created successfully", toastVisibilty);
        })
          .catch(() => {
            toast.error("Failed to update profile", toastVisibilty);
          })
          .finally(() => {
            setBtnLoading(false);
            setErrorMessage(null);
            setIsSignedUp(false);
          })
      })
        .catch(() => {
          toast.error("Failed to create account", toastVisibilty);
        })
        .finally(() => {
          setBtnLoading(false);
          setErrorMessage(null);
          setIsSignedUp(false);
        });
    }
    else {
      // sign in flow
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      ).then((userCredential) => {
        const user = userCredential.user;
        toast.success(`Welcome back ${user.displayName}`, toastVisibilty);
      })
        .catch(() => {
          toast.error("Invalid email or password", toastVisibilty);
        })
        .finally(() => {
          setBtnLoading(false);
          setErrorMessage(null);
        });
    }
  };

  return (
    <div className="relative min-h-screen w-full">

      {/* Background */}
      <Background />

      {/* Form Wrapper */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 pt-24">
        <div className="w-full max-w-md rounded-sm bg-black/75 p-6 sm:p-8 md:p-10 text-white">
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
                className="text-white placeholder-gray-400 outline w-full rounded-sm bg-black/80 p-3 outline-gray-500 focus:outline-2 focus:outline-white"
              />
            )}


            {/* Email */}
            <div>
              <input
                type="email"
                ref={email}
                placeholder="john.doe@example.com"
                className="bg-black/80 p-3 text-white w-full rounded-sm placeholder-gray-400 outline outline-gray-500 focus:outline-2 focus:outline-white"
              />
              {errorMessage?.email && (
                <p className="mt-1 text-sm font-semibold text-red-600">
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
                className="w-full rounded-sm bg-black/80 p-3 text-white placeholder-gray-400 outline outline-gray-500 focus:outline-2 focus:outline-white"
              />
              {errorMessage?.password && (
                <p className="mt-1 text-sm font-semibold text-red-600">
                  {errorMessage.password}
                </p>
              )}
            </div>


            {/* Action button sign-up / sign-in */}
            <button
              type="submit"
              className={`mt-4 w-full rounded-sm bg-red-600 p-3 font-semibold hover:bg-red-700  ${btnLoading
                ? "bg-red-600/80 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-800 cursor-pointer"
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
            />
            <label htmlFor="remember" className="cursor-pointer">
              {translator(langPref, "Remember me")}
            </label>
          </div>


          {/* Toggle */}
          <p className="mt-6 text-sm text-gray-300">
            {isSignedUp ? `${translator(langPref, "Already have an account?")}` : `${translator(langPref, "New to Netflix?")}`}{" "}
            <span
              className="cursor-pointer font-semibold text-white hover:underline"
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
