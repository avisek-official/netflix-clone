import React, { useState, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";

export default function HomePageFAQ(props) {
  const [q1Open, setQ1Open] = useState(false);
  const [q2Open, setQ2Open] = useState(false);
  const [q3Open, setQ3Open] = useState(false);
  const [q4Open, setQ4Open] = useState(false);
  const [q5Open, setQ5Open] = useState(false);
  const [q6Open, setQ6Open] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const enteredEmailRef = useRef();

  const getStartedHandler = () => {
    if (
      enteredEmailRef.current.value.trim().length > 0 &&
      enteredEmailRef.current.value.includes("@") &&
      enteredEmailRef.current.value.includes(".")
    ) {
      window.scrollTo(0, 0);
      setEmailError(false);
      props.getStartedEmail(enteredEmailRef.current.value.trim().toLowerCase());
    } else {
      setEmailError(true);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center border-b-8 border-gray-500 border-opacity-50">
      <span className="my-10 w-full flex text-center justify-center items-center text-white">
        <h1 className="text-2xl tablet:text-3xl laptop:text-5xl font-bold">
          Frequently Asked Questions
        </h1>
      </span>
      <div className="w-[90%] laptop:w-[60%] my-[2%] text-white">
        <span
          className={`bg-zinc-800 p-4 w-full flex ${
            !q1Open ? "my-2" : "mb-0.5"
          }  justify-between items-center cursor-pointer`}
          onClick={() => {
            setQ1Open(!q1Open);
          }}
        >
          <h1 className="text-lg tablet:text-2xl">What is Netflix?</h1>
          <AiOutlinePlus size={30} className={`${q1Open && `hidden`}`} />
          <HiOutlineX size={30} className={`${!q1Open && "hidden"}`} />
        </span>
        <span
          className={`bg-zinc-800 p-4 w-full flex mt-0 mb-2 justify-between items-center cursor-pointer ${
            !q1Open && "hidden"
          }`}
        >
          <h1 className="text-lg tablet:text-2xl">
            Netflix is a streaming service that offers a wide variety of
            award-winning TV shows, movies, anime, documentaries and more – on
            thousands of internet-connected devices.
            <br />
            <br />
            You can watch as much as you want, whenever you want, without a
            single ad – all for one low monthly price. There's always something
            new to discover, and new TV shows and movies are added every week!
          </h1>
        </span>

        <span
          className={`bg-zinc-800 p-4 w-full flex ${
            !q2Open ? "my-2" : "mb-0.5"
          }  justify-between items-center cursor-pointer`}
          onClick={() => {
            setQ2Open(!q2Open);
          }}
        >
          <h1 className="text-lg tablet:text-2xl">
            How much does Netflix cost ?
          </h1>
          <AiOutlinePlus size={30} className={`${q2Open && `hidden`}`} />
          <HiOutlineX size={30} className={`${!q2Open && "hidden"}`} />
        </span>
        <span
          className={`bg-zinc-800 p-4 w-full flex mt-0 mb-2 justify-between items-center cursor-pointer ${
            !q2Open && "hidden"
          }`}
        >
          <h1 className="text-lg tablet:text-2xl">
            Watch Netflix on your smartphone, tablet, Smart TV, laptop, or
            streaming device, all for one fixed monthly fee. Plans range from ₹
            149 to ₹ 649 a month. No extra costs, no contracts.
          </h1>
        </span>

        <span
          className={`bg-zinc-800 p-4 w-full flex ${
            !q3Open ? "my-2" : "mb-0.5"
          }  justify-between items-center cursor-pointer`}
          onClick={() => {
            setQ3Open(!q3Open);
          }}
        >
          <h1 className="text-lg tablet:text-2xl">Where can I watch ?</h1>
          <AiOutlinePlus size={30} className={`${q3Open && `hidden`}`} />
          <HiOutlineX size={30} className={`${!q3Open && "hidden"}`} />
        </span>
        <span
          className={`bg-zinc-800 p-4 w-full flex mt-0 mb-2 justify-between items-center cursor-pointer ${
            !q3Open && "hidden"
          }`}
        >
          <h1 className="text-lg tablet:text-2xl">
            Watch anywhere, anytime. Sign in with your Netflix account to watch
            instantly on the web at netflix.com from your personal computer or
            on any internet-connected device that offers the Netflix app,
            including smart TVs, smartphones, tablets, streaming media players
            and game consoles.
            <br />
            <br />
            You can also download your favourite shows with the iOS, Android, or
            Windows 10 app. Use downloads to watch while you're on the go and
            without an internet connection. Take Netflix with you anywhere.
          </h1>
        </span>

        <span
          className={`bg-zinc-800 p-4 w-full flex ${
            !q4Open ? "my-2" : "mb-0.5"
          }  justify-between items-center cursor-pointer`}
          onClick={() => {
            setQ4Open(!q4Open);
          }}
        >
          <h1 className="text-lg tablet:text-2xl">How do I cancel ?</h1>
          <AiOutlinePlus size={30} className={`${q4Open && `hidden`}`} />
          <HiOutlineX size={30} className={`${!q4Open && "hidden"}`} />
        </span>
        <span
          className={`bg-zinc-800 p-4 w-full flex mt-0 mb-2 justify-between items-center cursor-pointer ${
            !q4Open && "hidden"
          }`}
        >
          <h1 className="text-lg tablet:text-2xl">
            Netflix is flexible. There are no annoying contracts and no
            commitments. You can easily cancel your account online in two
            clicks. There are no cancellation fees – start or stop your account
            anytime.
          </h1>
        </span>

        <span
          className={`bg-zinc-800 p-4 w-full flex ${
            !q5Open ? "my-2" : "mb-0.5"
          }  justify-between items-center cursor-pointer`}
          onClick={() => {
            setQ5Open(!q5Open);
          }}
        >
          <h1 className="text-lg tablet:text-2xl">
            What can I watch on Netflix ?
          </h1>
          <AiOutlinePlus size={30} className={`${q5Open && `hidden`}`} />
          <HiOutlineX size={30} className={`${!q5Open && "hidden"}`} />
        </span>
        <span
          className={`bg-zinc-800 p-4 w-full flex mt-0 mb-2 justify-between items-center cursor-pointer ${
            !q5Open && "hidden"
          }`}
        >
          <h1 className="text-lg tablet:text-2xl">
            Netflix has an extensive library of feature films, documentaries, TV
            shows, anime, award-winning Netflix originals, and more. Watch as
            much as you want, anytime you want.
          </h1>
        </span>

        <span
          className={`bg-zinc-800 p-4 w-full flex ${
            !q6Open ? "my-2" : "mb-0.5"
          }  justify-between items-center cursor-pointer`}
          onClick={() => {
            setQ6Open(!q6Open);
          }}
        >
          <h1 className="text-lg tablet:text-2xl">
            Is Netflix good for kids ?
          </h1>
          <AiOutlinePlus size={30} className={`${q6Open && `hidden`}`} />
          <HiOutlineX size={30} className={`${!q6Open && "hidden"}`} />
        </span>
        <span
          className={`bg-zinc-800 p-4 w-full flex mt-0 mb-2 justify-between items-center cursor-pointer ${
            !q6Open && "hidden"
          }`}
        >
          <h1 className="text-lg tablet:text-2xl">
            The Netflix Kids experience is included in your membership to give
            parents control while kids enjoy family-friendly TV shows and films
            in their own space.
            <br />
            <br />
            Kids profiles come with PIN-protected parental controls that let you
            restrict the maturity rating of content kids can watch and block
            specific titles you don’t want kids to see.
          </h1>
        </span>
      </div>
      <div className="flex flex-col w-[90%] tablet:w-full justify-center items-center my-8 text-center">
        <h1 className="my-3 w-[75%] tablet:w-full text-xl text-white">
          Ready to watch? Enter your email to create or restart your membership.
        </h1>
        <span className="w-[90%] tablet:w-[75%] laptop:w-[60%] desktop:w-[50%] my-3 flex flex-col tablet:flex-row justify-center items-center">
          <input
            className="py-2 tablet:py-4 px-2 w-full tablet:w-[80%] outline-none"
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
    </div>
  );
}
