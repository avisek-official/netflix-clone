import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import md5 from "md5";

const FIREBASE_URL =
  "https://netflix-clone-e20c0-default-rtdb.asia-southeast1.firebasedatabase.app";

const loginData = "-lS#sI@lD";

export default function Signup(props) {
  const [enteredEmail, setEnteredEmail] = useState(props.enteredEmail);
  const [enteredPassword, setEnteredPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [signUpFailed, setSignUpFailed] = useState(false);

  const navigate = useNavigate();

  let userData = [];

  async function getUsers() {
    let users = await fetch(`${FIREBASE_URL}/users.json`);
    users = await users.json();
    for (const key in users) {
      if (key !== "0") {
        userData.push({ ...users[key], uid: key });
      }
    }
  }
  getUsers();

  const signUpHandler = async () => {
    setEmailError(false);
    setPwdError(false);
    if (
      enteredEmail.length === 0 ||
      !enteredEmail.includes("@") ||
      !enteredEmail.includes(".")
    ) {
      setEmailError(true);
    } else if (enteredPassword.length < 8) {
      setPwdError(true);
    } else {
      let userInfo = {
        email: enteredEmail,
        password: md5(enteredPassword),
        watchLater: { 0: "" },
      };
      if (userData.length > 0) {
        if (
          userData.filter((user) => user.email === enteredEmail).length === 1
        ) {
          setSignUpFailed(true);
        } else {
          setSignUpFailed(false);
          let response = await fetch(`${FIREBASE_URL}/users.json`, {
            method: "POST",
            body: JSON.stringify(userInfo),
          });

          if (response.ok) {
            localStorage.setItem(
              loginData,
              JSON.stringify({
                email: enteredEmail,
                idToken: md5(enteredPassword),
              })
            );
            navigate("/cat");
          }
        }
      } else {
        let response = await fetch(`${FIREBASE_URL}/users.json`, {
          method: "POST",
          body: JSON.stringify(userInfo),
        });
        if (response.ok) {
          localStorage.setItem(
            loginData,
            JSON.stringify({
              email: enteredEmail,
              idToken: md5(enteredPassword),
            })
          );
          navigate("/cat");
        }
      }
    }
  };

  return (
    <div className="border-b-8 border-gray-500 border-opacity-50 w-full h-full">
      <div className="w-full flex flex-col justify-center items-center absolute z-20">
        <span className="w-full flex justify-between items-center">
          <div id="logo" className="flex justify-start items-center m-5 px-4">
            <Link
              to={"/"}
              className="text-3xl tablet:text-4xl laptop:text-5xl tracking-widest text-red-600 bg-black bg-opacity-25 font-[500]"
            >
              NETFLIX
            </Link>
          </div>
          <div>
            <Link
              to={"/login"}
              className="rounded bg-red-600 text-white px-3 py-1 flex justify-start items-center mx-14"
            >
              Sign In
            </Link>
          </div>
        </span>
        <div
          id="signup-box"
          className="flex flex-col w-[98%] tablet:w-[60%] laptop:w-[35%] bg-black bg-opacity-70 p-8"
        >
          <label className="text-white text-xl tablet:text-2xl laptop:text-3xl text-center font-bold mb-8">
            Create a password to start your membership
          </label>
          <span
            className={`${
              !signUpFailed && "hidden"
            } my-1 p-4 w-full bg-red-200 border border-red-900 rounded`}
          >
            <h1 className="text-red-900 font-[500] text-center">
              Email already exists, try logging in
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
              onClick={signUpHandler}
            >
              Create Account
            </button>
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
