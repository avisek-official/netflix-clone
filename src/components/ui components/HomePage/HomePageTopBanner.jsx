import React, { useRef, useState } from "react";

import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export default function HomePageTopBanner(props) {
  const [emailError, setEmailError] = useState(false);
  const enteredEmailRef = useRef();

  const getStartedHandler = () => {
    if (
      enteredEmailRef.current.value.trim().length > 0 &&
      enteredEmailRef.current.value.includes("@") &&
      enteredEmailRef.current.value.includes(".")
    ) {
      setEmailError(false);
      props.getStartedEmail(enteredEmailRef.current.value.trim().toLowerCase());
    } else {
      setEmailError(true);
    }
  };

  return (
    <div
      id="main-container"
      className="border-b-8 border-gray-500 border-opacity-50 h-full"
    >
      <nav className="flex w-full justify-between items-center z-20 absolute py-5 px-2 tablet:px-6 laptop:px-10">
        <div
          id="logo"
          className="text-3xl tablet:text-4xl laptop:text-5xl tracking-widest text-red-600 bg-black bg-opacity-25 font-[500]"
        >
          NETFLIX
        </div>
        <span className="text-sm tablet:text-lg font-[400]">
          <select className="bg-black bg-opacity-30 text-white px-2 py-0.5 tablet:py-0 mx-3 border border-white rounded">
            <option defaultValue="English">English</option>
          </select>
          <Link
            to={"/login"}
            className="rounded bg-red-600 text-white px-3 py-1 tablet:py-0.5 mx-3"
          >
            Sign In
          </Link>
        </span>
      </nav>
      <div className="flex flex-col justify-center w-full items-center my-32 tablet:my-44 z-20 absolute">
        <span className="text-white tablet:w-[75%] laptop:w-[55%] desktop:w-[40%] text-[32px] tablet:text-[48px] font-bold text-center">
          Unlimited movies, TV shows and more.
        </span>
        <span className="text-white mobile:w-[80%] tablet:w-[65%] laptop:w-[40%] text-[20px] tablet:text-[28px] text-center">
          Watch anywhere. Cancel anytime.
        </span>
        <span className="text-white mobile:w-[90%] tablet:w-[75%] laptop:w-[60%] desktop:w-[50%] text-[16px] tablet:text-[20px] text-center my-5 font-[500]">
          Ready to watch? Enter your email to create or restart your membership.
        </span>
        <span className="w-[90%] tablet:w-[75%] laptop:w-[60%] desktop:w-[50%] my-3 flex flex-col tablet:flex-row justify-center items-center">
          <input
            className="py-2 tablet:py-4 px-2 w-full tablet:w-[80%] outline-none"
            type="text"
            placeholder="Email address"
            ref={enteredEmailRef}
          />
          {/* For Mobiles */}
          <span
            className={`w-full tablet:w-[75%] laptop:w-[60%] desktop:w-[50%] text-yellow-600 font-[500] ${
              emailError ? "flex tablet:hidden" : "hidden"
            }`}
          >
            Please Enter a valid email
          </span>

          <button
            className="w-[40%] bg-[#e50914] py-2 tablet:py-3 laptop:py-3.5 desktop:py-3 flex-nowrap px-2 border border-gray-500 active:border-red-900 active:border-3 active:bg-red-800 flex justify-center items-center text-sm text-white tablet:text-lg laptop:text-xl desktop:text-2xl font-[600] my-6 tablet:my-0 shrink"
            onClick={getStartedHandler}
          >
            Get Started &nbsp; <IoIosArrowForward />{" "}
          </button>
        </span>
        <span
          className={`w-[90%] tablet:w-[75%] laptop:w-[60%] desktop:w-[50%] text-yellow-600 font-[500] ${
            emailError ? "hidden tablet:flex" : "hidden"
          }`}
        >
          Please Enter a valid email
        </span>
      </div>
      <div id="main-banner">
        <span className="z-10 bg-black opacity-30">
          <img
            src={require("../../../assets/mainbg.jpg")}
            className="tablet:h-screen h-[550px] w-full shrink-0"
            alt="netflix"
          />
        </span>
      </div>
    </div>
  );
}
