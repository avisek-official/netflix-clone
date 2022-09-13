import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const loginData = "-lS#sI@lD";
const FIREBASE_URL =
  "https://netflix-clone-e20c0-default-rtdb.asia-southeast1.firebasedatabase.app";

export default function Watchlist(props) {
  const loginInfo = JSON.parse(localStorage.getItem(loginData)) || null;
  const navigate = useNavigate();

  const [wlState, setWLState] = useState([]);

  async function getWatchList() {
    let response = await fetch(
      `${FIREBASE_URL}/users/${loginInfo.uid}/watchLater.json`
    );
    let watchList = [];
    response = await response.json();
    for (const key in response) {
      if (key !== "0") {
        for (const secKey in response[key]) {
          watchList[watchList.length] = response[key][secKey];
        }
      }
    }
    setWLState(watchList);
  }

  useEffect(() => {
    getWatchList();
    // eslint-disable-next-line
  }, []);

  const removeFromWL = async (itemId) => {
    let response = await fetch(
      `${FIREBASE_URL}/users/${loginInfo.uid}/watchLater/${itemId}.json`,
      { method: "DELETE" }
    );
    if (response.ok) {
      getWatchList();
    }
  };

  return (
    <div className="w-full min-h-[550px]">
      <nav className="flex w-full justify-between items-center py-5 px-2 tablet:px-6 laptop:px-10">
        <div
          id="logo"
          className="text-3xl tablet:text-4xl laptop:text-5xl tracking-widest text-red-600 font-[500] cursor-pointer"
          onClick={() => {
            navigate("/cat");
          }}
        >
          NETFLIX
        </div>
        <span className="text-sm flex tablet:text-lg font-[400] shrink">
          <button
            className="rounded bg-red-600 text-white px-3 py-0.5 border border-red-600 mx-3"
            onClick={() => {
              localStorage.removeItem(loginData);
              navigate("/");
            }}
          >
            Logout
          </button>
        </span>
      </nav>
      <div className="w-full flex flex-col py-5 px-2 tablet:px-6 laptop:px-10 flex-wrap text-white">
        <div className="w-full flex font-[500] text-lg laptop:text-xl my-10 mx-2 justify-center">
          Saved to Watch Later
        </div>
        <div className="w-full flex flex-wrap justify-evenly tablet:justify-evenly">
          {wlState !== undefined && wlState.length === 0 && (
            <div className="text-white my-[10%] italic laptop:text-lg">
              Watchlist is empty
            </div>
          )}
          {wlState !== undefined && wlState.length > 0 && (
            <>
              {wlState.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-[160px] tablet:w-[200px] laptop:w-[240px] desktop:w-[280px] inline-block cursor-pointer p-2 relative"
                  >
                    <img
                      className="w-full h-auto block"
                      src={`https://image.tmdb.org/t/p/w300/${item.bdPath}`}
                      alt={item.title}
                    />
                    <div className="absolute top-0 left-0 p-4 w-full h-full hover:bg-black/80 opacity-0 text-white hover:opacity-100">
                      <p
                        className="whitespace-normal text-xs tablet:text-sm flex justify-center items-center font-[500] h-full text-center"
                        onClick={() => {
                          props.onWatch({
                            id: item.id,
                            media_type: item.type,
                          });
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        className="top-4 right-4 absolute"
                        onClick={() => {
                          removeFromWL(item.id);
                        }}
                      >
                        <AiOutlineDelete
                          title="Remove from Watchlist"
                          size={24}
                          color="#e50914"
                        />
                      </p>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
