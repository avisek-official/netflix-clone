import React from "react";

export default function HomePageFourthBanner() {
  return (
    <div className="w-full flex flex-col laptop:flex-row justify-start laptop:justify-center items-center border-b-8 border-gray-500 border-opacity-50 h-[500px]">
      <span
        id="left-span"
        className="w-full laptop:w-2/5 flex flex-col justify-start text-center laptop:text-left items-center laptop:items-start text-white mt-[2%] mb-[13%] laptop:my-0"
      >
        <h1 className="text-2xl tablet:text-3xl laptop:text-5xl font-bold mb-[1%]">
          Watch everywhere.
        </h1>
        <p className="tablet:text-lg laptop:text-2xl font-[500] mb-[1%]">
          Stream unlimited movies and TV shows on your phone, tablet, laptop,
          and TV.
        </p>
      </span>
      <span
        id="right-span"
        className="w-full laptop:w-2/5 flex flex-col justify-center items-center laptop:items-start text-white overflow-hidden"
      >
        <img
          src={require("../../../assets/multi-device.png")}
          alt="tv"
          className="w-[450px] h-[275px] absolute z-20"
        />
        <video
          autoPlay
          loop
          muted
          className="relative z-10 tablet:ml-[8px]  mb-[90px] laptop:ml-[77px] w-[235px] h-[292px] mobile:w-[283px] laptop:w-[283px] laptop:h-[200px]"
        >
          <source src={require("../../../assets/video-in-desktop.m4v")} />
        </video>
      </span>
    </div>
  );
}
