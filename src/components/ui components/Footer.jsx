import React from "react";

export default function Footer() {
  return (
    <div className="w-full flex flex-col px-[10%] py-[5%] flex-wrap text-gray-500">
      <div className="text-lg flex">
        Questions? Call
        <p className="ml-2 cursor-pointer hover:underline">000-800-040-1843</p>
      </div>
      <div className="text-xs laptop:text-sm flex my-4 w-full justify-evenly">
        <span className="flex flex-col laptop:flex-row w-full laptop:w-1/2 justify-evenly">
          <span className="flex flex-col w-1/2 justify-evenly">
            <p className="my-1 laptop:my-2 hover:underline cursor-pointer">
              FAQ
            </p>
            <p className="my-1 laptop:my-2 hover:underline cursor-pointer">
              Investor Relations
            </p>
            <p className="my-1 laptop:my-2 hover:underline cursor-pointer">
              Privacy
            </p>
            <p className="my-1 laptop:my-2 hover:underline cursor-pointer">
              Speed Test
            </p>
          </span>
          <span className="flex flex-col w-1/2 justify-evenly">
            <p className="my-1 laptop:my-2 hover:underline cursor-pointer">
              Help Centre
            </p>
            <p className="my-1 laptop:my-2 hover:underline cursor-pointer">
              Jobs
            </p>
            <p className="my-1 laptop:my-2 hover:underline cursor-pointer">
              Cookie Preferences
            </p>
            <p className="my-1 laptop:my-2 hover:underline cursor-pointer">
              Legal Notices
            </p>
          </span>
        </span>
        <span className="flex flex-col laptop:flex-row w-full laptop:w-1/2 justify-evenly">
          <span className="flex flex-col w-1/2 justify-evenly">
            <p className="my-1 laptop:my-2 hover:underline cursor-pointer">
              Account
            </p>
            <p className="my-1 laptop:my-2 hover:underline cursor-pointer">
              Ways to Watch
            </p>
            <p className="my-1 laptop:my-2 hover:underline cursor-pointer">
              Corporate Information
            </p>
            <p className="my-1 laptop:my-2 hover:underline cursor-pointer">
              Only on Netflix
            </p>
          </span>
          <span className="flex flex-col w-1/2 justify-evenly">
            <p className="my-1 laptop:my-2 hover:underline cursor-pointer">
              Media Centre
            </p>
            <p className="my-1 laptop:my-2 hover:underline cursor-pointer">
              Terms of Use
            </p>
            <p className="my-1 laptop:my-2 hover:underline cursor-pointer">
              Contact Us
            </p>
          </span>
        </span>
      </div>
      <div className="my-3">
        <select className="bg-transparent py-3 outline-none px-4 border border-gray-500">
          <option>English</option>
        </select>
      </div>
      <div className="my-3">
        <h1>Netflix Clone by Avisek Kar</h1>
      </div>
    </div>
  );
}
