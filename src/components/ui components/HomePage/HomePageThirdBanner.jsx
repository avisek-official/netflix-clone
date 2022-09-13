import React from "react";

//icons
import { AiOutlineLoading } from "react-icons/ai";

export default function HomePageThirdBanner() {
  return (
    <div className="w-full flex flex-col-reverse laptop:flex-row justify-start laptop:justify-center items-center border-b-8 border-gray-500 border-opacity-50">
      <span
        id="left-span"
        className="w-full laptop:w-2/5 flex flex-col justify-center items-center text-white overflow-hidden mb-5"
      >
        <img
          src={require("../../../assets/ban3.jpg")}
          alt="tv"
          className="relative z-10"
        />
        <span className="absolute z-20 mt-[250px] mb-[10%] tablet:mb-[7%] laptop:mb-[5%] border-2 border-gray-600 rounded-lg bg-black p-2 flex">
          <img
            src={require("../../../assets/st-small.png")}
            alt="stranger things"
            height="80px"
            width="40px"
            className="mr-2"
          />
          <span className="flex flex-col justify-center mx-4">
            <h3 className="font-bold">Stranger Things</h3>
            <p className="text-sm text-blue-700">Downloading...</p>
          </span>
          <span className="ml-8 flex items-center">
            <AiOutlineLoading
              className="animate-spin"
              color="#1d4ed8"
              size={30}
            />
          </span>
        </span>
      </span>
      <span
        id="right-span"
        className="w-full laptop:w-2/5 flex flex-col justify-start text-center laptop:text-left items-center laptop:items-start text-white my-5 px-1"
      >
        <h1 className="text-2xl tablet:text-3xl laptop:text-5xl font-bold mb-[2%]">
          Download your shows to watch offline.
        </h1>
        <p className="tablet:text-lg laptop:text-2xl font-[500] mb-[1%]">
          Save your favourites easily and always have something to watch.
        </p>
      </span>
    </div>
  );
}
