import React from "react";

export default function HomePageLastBanner() {
  return (
    <div className="w-full flex flex-col-reverse laptop:flex-row justify-start laptop:justify-center items-center border-b-8 border-gray-500 border-opacity-50">
      <span
        id="left-span"
        className="w-full laptop:w-2/5 flex flex-col justify-center items-center text-white overflow-hidden mb-5"
      >
        <img
          src={require("../../../assets/kids.png")}
          alt="tv"
          className="relative z-10"
        />
      </span>
      <span
        id="right-span"
        className="w-full laptop:w-2/5 flex flex-col justify-start text-center laptop:text-left items-center laptop:items-start text-white my-5 px-1"
      >
        <h1 className="text-2xl tablet:text-3xl laptop:text-5xl font-bold mb-[2%]">
          Create profiles for children.
        </h1>
        <p className="tablet:text-lg laptop:text-2xl font-[500] mb-[1%]">
          Send children on adventures with their favourite characters in a space
          made just for them—free with your membership.
        </p>
      </span>
    </div>
  );
}
