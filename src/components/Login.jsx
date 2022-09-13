import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import md5 from "md5";
import verifyUser from "./verifyUser";

const loginData = "-lS#sI@lD";

export default function Login(props) {
  const [enteredEmail, setEnteredEmail] = useState(props.enteredEmail);

  const [enteredPassword, setEnteredPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async () => {
    setEmailError(false);
    setPwdError(false);
    setLoginFailed(false);
    if (
      enteredEmail.length === 0 ||
      !enteredEmail.includes("@") ||
      !enteredEmail.includes(".")
    ) {
      setEmailError(true);
    } else if (enteredPassword.length < 8) {
      setPwdError(true);
    } else {
      let auth = await verifyUser(enteredEmail, md5(enteredPassword));

      if (auth !== false) {
        setLoginFailed(false);
        localStorage.setItem(
          loginData,
          JSON.stringify({
            email: enteredEmail,
            idToken: md5(enteredPassword),
            uid: auth,
          })
        );
        navigate("/cat");
      } else {
        setLoginFailed(true);
      }
    }
  };

  return (
    <div className="border-b-8 border-gray-500 border-opacity-50 w-full h-full">
      <div className="w-full flex flex-col justify-center items-center absolute z-20">
        <div id="logo" className="w-full flex justify-start m-5 px-8">
          <Link
            to={"/"}
            className="text-3xl tablet:text-4xl laptop:text-5xl tracking-widest text-red-600 bg-black bg-opacity-25 font-[500]"
          >
            NETFLIX
          </Link>
        </div>
        <div
          id="signin-box"
          className="flex flex-col w-[98%] tablet:w-[60%] laptop:w-[35%] bg-black bg-opacity-70 p-8"
        >
          <label className="text-white text-3xl font-bold mb-8">Sign In</label>
          <span
            className={`${
              !loginFailed && "hidden"
            } my-1 p-4 w-full bg-red-200 border border-red-900 rounded`}
          >
            <h1 className="text-red-900 font-[500] text-center">
              Invalid Credentials
            </h1>
          </span>
          <span className="w-full flex flex-col justify-center items-center">
            <input
              className="my-2 p-3 w-full outline-none bg-gray-600 text-white bg-opacity-100 rounded"
              placeholder="Email address"
              type="text"
              value={enteredEmail}
              onChange={(e) => {
                setEnteredEmail(e.target.value.trim().toLowerCase());
              }}
            />
            <span
              className={`w-full flex text-yellow-600 font-[500] ${
                !emailError && "hidden"
              }`}
            >
              Please Enter a valid email
            </span>
            <input
              className="my-2 p-3 w-full outline-none bg-gray-600 text-white bg-opacity-100 rounded"
              type="password"
              placeholder="Password"
              value={enteredPassword}
              onChange={(e) => {
                setEnteredPassword(e.target.value.trim());
              }}
            />
            <span
              className={`w-full flex text-yellow-600 font-[500] ${
                !pwdError && "hidden"
              }`}
            >
              Password must contain atleast 8 characters
            </span>
            <button
              className="w-full bg-[#e50914] text-white font-[500] mt-8 py-3 rounded"
              onClick={loginHandler}
            >
              Sign In
            </button>
          </span>
          <span className="text-white mt-14 flex w-full justify-start items-center">
            <p className="text-gray-500 mr-2">New to Netflix?</p>
            <Link to={"/"} className="hover:underline cursor-pointer">
              Sign up now
            </Link>
          </span>
        </div>
      </div>
      <div id="main-banner">
        <span className="z-10 bg-black opacity-30">
          <img
            src={require("../assets/mainbg.jpg")}
            className="tablet:h-screen h-[550px] w-full shrink-0 hidden tablet:block"
            alt="netflix"
          />
          <span className="tablet:h-screen h-[550px] w-full shrink-0 block tablet:hidden"></span>
        </span>
      </div>
    </div>
  );
}
