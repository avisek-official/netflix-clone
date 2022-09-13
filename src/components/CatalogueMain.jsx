import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import ISO6391 from "iso-639-1";
import verifyUser from "./verifyUser";

const loginData = "-lS#sI@lD";
const FIREBASE_URL =
  "https://netflix-clone-e20c0-default-rtdb.asia-southeast1.firebasedatabase.app";

export default function CatalogueMain() {
  const [loginInfo, setLoginInfo] = useState(
    JSON.parse(localStorage.getItem(loginData)) || null
  );
  const navigate = useNavigate();
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);

  useEffect(() => {
    async function checkUser() {
      if (loginInfo === null) {
        navigate("/");
      } else {
        let auth = await verifyUser(loginInfo.email, loginInfo.idToken);

        if (auth !== false) {
          navigate("/cat");
        } else {
          navigate("/");
        }
      }
    }
    checkUser();
    // eslint-disable-next-line
  }, [loginInfo]);

  const [topMovies, setTopMovies] = useState([]);
  const [fullDesc, setFullDesc] = useState(false);

  const [movie, setMovie] = useState();

  useEffect(() => {
    async function getTopMovies() {
      let response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=1d847168b28e6a8153755da57a032b4c"
      );
      response = await response.json();
      setTopMovies(response.results);
    }
    getTopMovies();
  }, []);

  useEffect(() => {
    setMovie(topMovies[Math.floor(Math.random() * topMovies.length)]);
  }, [topMovies]);

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
  return (
    <div className="w-full h-[550px]">
      <nav className="flex w-full justify-between items-center z-20 absolute py-5 px-2 tablet:px-6 laptop:px-10">
        <div
          id="logo"
          className="text-3xl tablet:text-4xl laptop:text-5xl tracking-widest text-red-600 font-[500]"
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
              setLoginInfo(null);
              navigate("/");
            }}
          >
            Logout
          </button>
        </span>
      </nav>
      {movie !== undefined && (
        <>
          <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
          <div
            id="title_container"
            className="absolute w-full h-[550px] flex flex-col justify-center py-5 px-2 tablet:px-6 laptop:px-10 mt-[12%] tablet:mt-[8%] laptop:mt-[5%]"
          >
            <div className="text-white text-2xl tablet:text-3xl laptop:text-4xl font-bold">
              {movie.title}
            </div>
            <div
              className={`text-white text-sm tablet:text-base laptop:text-lg my-3 w-[50%] cursor-pointer ${
                fullDesc && "hidden"
              }`}
              onClick={() => {
                setFullDesc(!fullDesc);
              }}
            >
              {movie.overview.length >= 128 ? (
                <p>
                  <span>{movie.overview.slice(0, 128)}... </span>
                  <span className="text-red-600">Read more</span>
                </p>
              ) : (
                <span>{movie.overview.slice(0, 128)}</span>
              )}
              <br />
              <b>Language: </b>
              {ISO6391.getName(movie.original_language)}
            </div>
            <div
              className={`text-white text-sm tablet:text-base laptop:text-lg my-3 w-[50%] cursor-pointer ${
                !fullDesc && "hidden"
              }`}
              onClick={() => {
                setFullDesc(!fullDesc);
              }}
            >
              {movie.overview}
              {movie.overview.length >= 128 && (
                <span className="text-red-600"> Read less</span>
              )}
              <br />
              <b>Language: </b>
              {ISO6391.getName(movie.original_language)}
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
                    title: movie.title,
                    bdPath: movie.backdrop_path,
                    type: "movie",
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
  );
}
