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
import { addUserInfo } from "../utils/userSlice";
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
    <div>
      <Header />
      <img src={NTFLX_BG} alt="Background" className="absolute" />

      <div className="bg-[rgba(0,0,0,0.75)] max-w-md w-1/2 !p-12 relative left-1/3 top-24 text-white">
        <h1 className="text-5xl !text-left font-bold">
          {isSignedUp ? "Sign Up" : "Sign In"}
        </h1>
        <div className="flex flex-col items-center w-full">
          <form
            onSubmit={(e) => e.preventDefault()}
            action=""
            className="w-[100%]"
          >
            {isSignedUp && (
              <input
                type="text"
                ref={fullName}
                className="!p-3 bg-black/80 w-full !mt-8 placeholder:text-gray-300 rounded-sm focus:outline-white focus:outline-2 focus:m-4 outline-1 outline-gray-500"
                placeholder="Full name"
              />
            )}
            <div className="!my-8">
              <input
                type="email"
                ref={email}
                className="!p-3 bg-black/80 w-full placeholder:text-gray-300 rounded-sm focus:outline-white focus:outline-2 focus:m-4 outline-1 outline-gray-500"
                placeholder="Email or mobile number"
              />
              <p className="text-red-700 p-2 text-md !py-0 !my-0 font-semibold">
                {errorMessage?.email}
              </p>
            </div>
            <div className="!my-8">
              <input
                type="password"
                ref={password}
                className="!p-3 bg-black/80 w-full placeholder:text-gray-300 rounded-sm focus:outline-white focus:outline-2 focus:m-4 outline-1 outline-gray-500"
                placeholder="Password"
              />
              <p className="text-red-700 p-2 text-md !py-0 !my-0 font-semibold">
                {errorMessage?.password}
              </p>
            </div>
            <input
              type="submit"
              value={`${isSignedUp ? "Sign Up" : "Sign In"}`}
              className="!p-2.5 bg-red-700 text-white hover:bg-red-800 w-full"
              onClick={handleSubmit}
            />
            <p className="hover:underline hover:underline-offset-2 text-white text-center hover:cursor-pointer font-semibold !my-5">
              Forgot password?
            </p>
          </form>
        </div>
        <div className="flex items-center gap-3 !my-5">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 cursor-pointer accent-white"
          />
          <label
            htmlFor="remember"
            className="text-white ml-2 cursor-pointer font-normal"
          >
            {" "}
            Remember me{" "}
          </label>
        </div>

        <p className="text-md mx-auto hover:underline-offset-2 text-white">
          {isSignedUp ? "Already have an account?" : "New to Netflix?"}{" "}
          <span
            className="hover:underline hover:underline-offset-2 text-white font-semibold cursor-pointer"
            onClick={handleSignUp}
          >
            {isSignedUp ? "Sign in now." : "Sign up now."}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
