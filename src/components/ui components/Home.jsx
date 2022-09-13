import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import verifyUser from "../verifyUser";

import HomePageFAQ from "./HomePage/HomePageFAQ";
import HomePageFourthBanner from "./HomePage/HomePageFourthBanner";
import HomePageLastBanner from "./HomePage/HomePageLastBanner";
import HomePageSecBanner from "./HomePage/HomePageSecBanner";
import HomePageThirdBanner from "./HomePage/HomePageThirdBanner";
import HomePageTopBanner from "./HomePage/HomePageTopBanner";

const loginData = "-lS#sI@lD";

export default function Home(props) {
  const [loginInfo, setLoginInfo] = useState(
    JSON.parse(localStorage.getItem(loginData)) || null
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (loginInfo === null) {
      setLoginInfo(null);
      localStorage.removeItem(loginData);
      navigate("/");
    } else {
      if (verifyUser(loginInfo.email, loginInfo.idToken)) {
        navigate("/cat");
      } else {
        navigate("/");
      }
    }
    // eslint-disable-next-line
  }, [loginInfo]);

  const getStartedEmail = (enteredEmail) => {
    props.getStartedEmail(enteredEmail);
  };

  return (
    <>
      <HomePageTopBanner getStartedEmail={getStartedEmail} />
      <HomePageSecBanner />
      <HomePageThirdBanner />
      <HomePageFourthBanner />
      <HomePageLastBanner />
      <HomePageFAQ getStartedEmail={getStartedEmail} />
    </>
  );
}
