//Components
import Footer from "./components/ui components/Footer";
import Home from "./components/ui components/Home";

import { Routes, Route } from "react-router";
import { useNavigate } from "react-router";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CatalogueMain from "./components/CatalogueMain";
import { useState } from "react";
import CatalogueRow from "./components/CatalogueRow";
import WatchMain from "./components/WatchMain";
import Watchlist from "./components/Watchlist";

const FIREBASE_URL =
  "https://netflix-clone-e20c0-default-rtdb.asia-southeast1.firebasedatabase.app";

function App() {
  const [email, setEmail] = useState("");
  const [watchId, setWatchId] = useState("");
  const [watchType, setWatchType] = useState("");
  const navigate = useNavigate();

  const getStartedEmail = async (enteredEmail) => {
    setEmail(enteredEmail);
    let users = await fetch(`${FIREBASE_URL}/users.json`);
    users = await users.json();
    if (Object.keys(users).length > 1) {
      let emailExists = false;
      for (const key in users) {
        if (users[key].email === enteredEmail) {
          emailExists = true;
          break;
        }
      }
      if (emailExists) {
        navigate("/login");
      } else {
        navigate("/signup");
      }
    } else {
      navigate("/signup");
    }
  };

  const watchHandler = (watchDetails) => {
    setWatchId(watchDetails.id);
    setWatchType(watchDetails.media_type);
    window.scrollTo(0, 0);
    navigate("/watch");
  };

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Home getStartedEmail={getStartedEmail} />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <>
              <Login enteredEmail={email} />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <>
              <Signup enteredEmail={email} />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/cat"
          element={
            <>
              <CatalogueMain />
              <CatalogueRow
                rowId={"row1"}
                title={"Movies Trending Today"}
                fetchURL={
                  "https://api.themoviedb.org/3/trending/movie/day?api_key=1d847168b28e6a8153755da57a032b4c"
                }
                watchType={"movie"}
                onWatch={watchHandler}
              />
              <CatalogueRow
                rowId={"row2"}
                title={"TV Shows Trending Today"}
                fetchURL={
                  "https://api.themoviedb.org/3/trending/tv/day?api_key=1d847168b28e6a8153755da57a032b4c"
                }
                watchType={"tv"}
                onWatch={watchHandler}
              />
              <CatalogueRow
                rowId={"row3"}
                title={"Best in Horror"}
                fetchURL={
                  "https://api.themoviedb.org/3/discover/movie?api_key=1d847168b28e6a8153755da57a032b4c&with_genres=27&page=2"
                }
                watchType={"movie"}
                onWatch={watchHandler}
              />
              <CatalogueRow
                rowId={"row4"}
                title={"Best in Fantasy"}
                fetchURL={
                  "https://api.themoviedb.org/3/discover/movie?api_key=1d847168b28e6a8153755da57a032b4c&with_genres=14&page=2"
                }
                watchType={"movie"}
                onWatch={watchHandler}
              />
              <CatalogueRow
                rowId={"row5"}
                title={"Best in Comedy"}
                fetchURL={
                  "https://api.themoviedb.org/3/discover/movie?api_key=1d847168b28e6a8153755da57a032b4c&with_genres=35&page=5"
                }
                watchType={"movie"}
                onWatch={watchHandler}
              />
              <CatalogueRow
                rowId={"row6"}
                title={"Best in Thriller"}
                fetchURL={
                  "https://api.themoviedb.org/3/discover/movie?api_key=1d847168b28e6a8153755da57a032b4c&with_genres=53"
                }
                watchType={"movie"}
                onWatch={watchHandler}
              />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/watch"
          element={
            <>
              <WatchMain
                watchId={watchId}
                watchType={watchType}
                onWatch={watchHandler}
              />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/watchlist"
          element={
            <>
              <Watchlist onWatch={watchHandler} />
              <Footer />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Home getStartedEmail={getStartedEmail} />
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
