import React, { useRef, useState } from "react";
import Header from "./Header";
import { signInValidation } from "../utils/Validate";
import { auth } from "../utils/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUserInfo } from "../utils/store/userSlice";
import { NTFLX_BG } from "../utils/constant";

const Login = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const handleSignUp = () => {
    setIsSignedUp(!isSignedUp);
  };

  const handleSubmit = () => {
    const err = signInValidation(email.current.value, password.current.value);
    setErrorMessage(err);
    if (errorMessage === null) {
      if (isSignedUp) {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value,
        )
          .then(() => {
            updateProfile(auth.currentUser, {
              displayName: fullName.current.value,
            })
              .then(() => {
                const { email, displayName } = auth.currentUser;
                dispatch(addUserInfo({ email: email, name: displayName }));
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
          });
      } else {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value,
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("user logged in:", user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <Header />

      {/* Background */}
      <img
        src={NTFLX_BG}
        alt="Background"
        className="absolute inset-0 object-cover h-full w-full"
      />
      <div className="absolute bg-black/50 inset-0 " />

      {/* Form Wrapper */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 pt-24">
        <div className="w-full max-w-md rounded-sm bg-black/75 p-6 sm:p-8 md:p-10 text-white">
          <h1 className="mb-6 text-3xl sm:text-4xl font-bold">
            {isSignedUp ? "Sign Up" : "Sign In"}
          </h1>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {isSignedUp && (
              <input
                type="text"
                ref={fullName}
                placeholder="John Doe"
                className="text-white placeholder-gray-400 outline w-full rounded-sm bg-black/80 p-3 outline-gray-500 focus:outline-2 focus:outline-white"
              />
            )}

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

            <button
              onClick={handleSubmit}
              className="mt-4 w-full rounded-sm bg-red-600 p-3 font-semibold hover:bg-red-700"
            >
              {isSignedUp ? "Sign Up" : "Sign In"}
            </button>

            <p className="hover:underline text-center text-sm mt-2  cursor-pointer">
              Forgot password?
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
              Remember me
            </label>
          </div>

          {/* Toggle */}
          <p className="mt-6 text-sm text-gray-300">
            {isSignedUp ? "Already have an account?" : "New to Netflix?"}{" "}
            <span
              className="cursor-pointer font-semibold text-white hover:underline"
              onClick={handleSignUp}
            >
              {isSignedUp ? "Sign in now." : "Sign up now."}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
