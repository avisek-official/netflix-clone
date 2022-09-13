import React, { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import ISO6391 from "iso-639-1";
import { BsStarFill } from "react-icons/bs";
import TvEpisodes from "./TvEpisodes";
import CatalogueRow from "./CatalogueRow";

const loginData = "-lS#sI@lD";
const FIREBASE_URL =
  "https://netflix-clone-e20c0-default-rtdb.asia-southeast1.firebasedatabase.app";

export default function WatchMain(props) {
  const [movie, setMovie] = useState();
  const navigate = useNavigate();
  const loginInfo = JSON.parse(localStorage.getItem(loginData)) || null;
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);

  useEffect(() => {
    if (
      props.watchId !== null &&
      props.watchId !== undefined &&
      props.watchId !== "" &&
      props.watchType !== null &&
      props.watchType !== undefined &&
      props.watchType !== ""
    ) {
      async function getMovieDetails() {
        let response = await fetch(
          `https://api.themoviedb.org/3/${props.watchType}/${props.watchId}?api_key=1d847168b28e6a8153755da57a032b4c`
        );
        response = await response.json();
        setMovie(response);
      }
      getMovieDetails();
    } else {
      navigate("/cat");
    }
    // eslint-disable-next-line
  }, [props]);

  useEffect(() => {
    if (movie !== undefined) {
      async function getWatchList() {
        setAddedToWatchlist(false);
        let response = await fetch(
          `${FIREBASE_URL}/users/${loginInfo.uid}/watchLater.json`
        );
        response = await response.json();
        for (const key in response) {
          if (Number(key) === movie.id) {
            setAddedToWatchlist(true);
          }
        }
      }
      getWatchList();
    }
    // eslint-disable-next-line
  }, [movie]);

  const addToWatchlist = async (movieDetails) => {
    const id = movieDetails.id;
    const userId = loginInfo.uid;
    let response = await fetch(
      `${FIREBASE_URL}/users/${userId}/watchLater/${id}.json`,
      {
        method: "POST",
        body: JSON.stringify(movieDetails),
      }
    );
    if (response.ok) {
      setAddedToWatchlist(true);
    }
  };

  const [seasonsState, setSeasonState] = useState([]);
  const [seasonValue, setSeasonValue] = useState(1);
  const seasons = [];
  useEffect(() => {
    if (movie !== undefined) {
      for (let i = 1; i <= movie.number_of_seasons; i++) {
        seasons.push(i);
      }
    }
    setSeasonState(seasons);
    // eslint-disable-next-line
  }, [movie]);

  // if (movie !== undefined && movie.success === false) {
  //   navigate("/cat");
  // }

  return (
    <>
      <div className="w-full h-[550px]">
        <nav className="flex w-full justify-between items-center z-20 absolute py-5 px-2 tablet:px-6 laptop:px-10">
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
            <Link
              to={"/watchlist"}
              className="rounded text-white px-3 py-0.5 border border-white mx-3 hover:bg-gray-200 hover:bg-opacity-20"
            >
              Watchlist
            </Link>
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
        {movie !== undefined && movie.success !== false && (
          <>
            <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
            <div
              id="title_container"
              className="absolute w-full h-[550px] flex flex-col justify-center py-5 px-2 tablet:px-6 laptop:px-10 mt-[30%] tablet:mt-[15%] laptop:mt-[10%]"
            >
              <div className="text-white text-2xl tablet:text-3xl laptop:text-4xl font-bold my-2">
                {movie.title || movie.name}
              </div>
              <div className="text-sm tablet:text-base laptop:text-lg text-white italic my-4">
                {props.watchType === "tv" && (
                  <p className="font-bold">Season 1 Episode 1</p>
                )}
                {props.watchType === "movie" ? (
                  <>{movie.runtime} mins</>
                ) : (
                  <>
                    {movie.episode_run_time[0] &&
                      `${movie.episode_run_time[0]} mins`}
                  </>
                )}
              </div>
              <div className="flex w-[75%] justify-start">
                <button className="bg-white rounded px-3 py-2 text-sm tablet:text-base laptop:text-lg flex items-center mr-4">
                  Play <AiOutlinePlayCircle size={24} className="ml-2" />
                </button>
                <button
                  className={`bg-transparent text-white border border-white rounded px-3 py-2 text-sm tablet:text-base laptop:text-lg flex items-center hover:bg-gray-200 hover:bg-opacity-20 ${
                    addedToWatchlist && "hidden"
                  }`}
                  onClick={() => {
                    addToWatchlist({
                      id: movie.id,
                      title: movie.title || movie.name,
                      bdPath: movie.backdrop_path,
                      type: props.watchType,
                    });
                  }}
                >
                  Watch Later <AiOutlineHeart size={24} className="ml-2" />
                </button>
                <button
                  className={`bg-transparent text-white border border-white rounded px-1 py-2 text-sm tablet:text-base laptop:text-lg flex items-center hover:bg-gray-200 hover:bg-opacity-20 ${
                    !addedToWatchlist && "hidden"
                  }`}
                >
                  Added to Watchlist <AiFillHeart size={24} className="ml-1" />
                </button>
              </div>
            </div>
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
            />
          </>
        )}
      </div>

      {/* Watch Information */}
      <div className="w-full flex flex-col justify-center text-white py-5 px-2 tablet:px-6 laptop:px-10">
        <h1 className="tablet:text-lg laptop:text-xl font-[500]">
          About this {props.watchType === "movie" ? "Movie" : "Show"}
        </h1>
        {movie !== undefined && movie.success !== false && (
          <div
            id="movie-info"
            className="flex w-full flex-col justify-center items-start my-4"
          >
            <span className="w-full">
              <p className="text-justify italic text-xs tablet:text-sm laptop:text-base">
                {movie.overview}
              </p>
            </span>
            <span className="w-full flex flex-col laptop:flex-row justify-between items-start text-left text-sm tablet:text-base laptop:text-lg flex-wrap my-5">
              <span className="w-full flex justify-between text-left">
                <span className="laptop:mr-4 mx-0 my-2 w-[33%] text-left">
                  <b className="mr-4">Language</b>
                  <br />
                  {ISO6391.getName(movie.original_language)}
                </span>
                <span className="laptop:mr-4 my-2 w-[33%] text-left">
                  <b className="mr-4">Genres</b>
                  <br />
                  {movie.genres.map((e) => {
                    return e.name + ", ";
                  })}
                </span>
                <span
                  className={`laptop:mr-4 mr-0 my-2 w-[33%] text-left ${
                    props.watchType === "tv" && "hidden"
                  }`}
                >
                  <b className="mr-4">Runtime</b>
                  <br /> {movie.runtime} mins
                </span>
                {props.watchType === "tv" && movie.episode_run_time.length > 0 && (
                  <span className={`laptop:mr-4 mr-0 my-2 w-[33%] text-left`}>
                    <b className="mr-4">Average Runtime</b>
                    <br />
                    {props.watchType === "tv" && movie.episode_run_time[0]} mins
                  </span>
                )}
              </span>
              <span className="w-full flex justify-between text-left">
                <span
                  className={`laptop:mr-4 mr-0 my-2 w-[33%] text-left ${
                    props.watchType === "tv" && "hidden"
                  }`}
                >
                  <b className="mr-4">Release Date</b>
                  <br /> {movie.release_date}
                </span>
                <span
                  className={`laptop:mr-4 mr-0 my-2 w-[33%] text-left ${
                    props.watchType !== "tv" && "hidden"
                  }`}
                >
                  <b className="mr-4">Last Air Date</b>
                  <br />
                  {movie.last_air_date || "Not Available"}
                </span>
                <span className="laptop:mr-4 mr-0 my-2 w-[33%] text-left">
                  <b className="mr-4">Rating</b>
                  <br />
                  <span
                    className={`px-2 py-0.5 rounded-md flex justify-center w-max items-center text-white mr-2 ${
                      movie.vote_average <= 4 && "bg-red-600"
                    } ${
                      movie.vote_average > 4 &&
                      movie.vote_average <= 6.5 &&
                      "bg-yellow-600"
                    } ${movie.vote_average > 6.5 && "bg-green-600"}`}
                  >
                    <BsStarFill className="mr-1" />
                    {movie.vote_average.toFixed(1)}
                  </span>
                </span>
                <span
                  className={`laptop:mr-4 mr-0 my-2 w-[33%] text-left ${
                    props.watchType !== "tv" && "hidden"
                  }`}
                >
                  <b className="mr-4">Status</b>
                  <br /> {movie.status}
                </span>
              </span>
            </span>
          </div>
        )}
      </div>

      {/* For TV, display season and episodes */}
      {props.watchType === "tv" &&
        movie !== undefined &&
        movie.success !== false && (
          <>
            <div className="flex w-full flex-col justify-center items-start my-4 py-5 px-2 tablet:px-6 laptop:px-10">
              <select
                value={seasonValue}
                onChange={(e) => {
                  setSeasonValue(e.target.value);
                }}
                className="px-3 py-2 outline-none cursor-pointer rounded-md"
              >
                {seasonsState !== undefined && (
                  <>
                    {seasonsState.map((i) => {
                      return (
                        <option key={i} value={i} defaultValue>
                          Season {i}
                        </option>
                      );
                    })}
                  </>
                )}
              </select>
            </div>
            <TvEpisodes
              rowId={"row1"}
              title={`Episodes in Season ${seasonValue}`}
              fetchURL={`https://api.themoviedb.org/3/tv/${props.watchId}/season/${seasonValue}?api_key=1d847168b28e6a8153755da57a032b4c`}
            />
          </>
        )}
      <br />
      <br />
      <br />
      {/* Recommended Movies / Shows */}
      {movie !== undefined && movie.success !== false && (
        <>
          <CatalogueRow
            rowId={"row6"}
            title={`Explore similar ${
              props.watchType === "tv" ? "shows" : "movies"
            }`}
            fetchURL={`https://api.themoviedb.org/3/discover/${
              props.watchType
            }?api_key=1d847168b28e6a8153755da57a032b4c&with_genres=${movie.genres.map(
              (e) => {
                return e.id;
              }
            )}`}
            watchType={props.watchType}
            onWatch={(data) => {
              props.onWatch(data);
            }}
          />
        </>
      )}
    </>
  );
}
