import React from "react";

export default function HomePageSecBanner() {
  return (
    <div className="w-full flex flex-col laptop:flex-row justify-start laptop:justify-center items-center border-b-8 border-gray-500 border-opacity-50 h-[500px]">
      <span
        id="left-span"
        className="w-full laptop:w-2/5 flex flex-col justify-start text-center laptop:text-left items-center laptop:items-start text-white mt-[2%] mb-[13%] laptop:my-0"
      >
        <h1 className="text-2xl tablet:text-3xl laptop:text-5xl font-bold mb-[1%]">
          Enjoy on your TV.
        </h1>
        <p className="tablet:text-lg laptop:text-2xl font-[500] mb-[1%]">
          Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
          players and more.
        </p>
      </span>
      <span
        id="right-span"
        className="w-full laptop:w-2/5 flex flex-col justify-center items-center laptop:items-start text-white overflow-hidden"
      >
        <img
          src={require("../../../assets/tv.png")}
          alt="tv"
          className="w-[450px] h-[300px] absolute z-20"
        />
        <video
          autoPlay
          loop
          muted
          className="relative z-10 ml-[15px] laptop:ml-[60px]"
          height="240px"
          width="340px"
        >
          <source src={require("../../../assets/video-in-tv.m4v")} />
        </video>
      </span>
    </div>
  );
}
