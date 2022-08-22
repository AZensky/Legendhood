import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import HomePageNav from "./HomePageNav";
import HomePageTopSec from "./HomePageTopSec";
import HomePageInvestSec from "./HomePageInvestSec";
import "./HomePage.css";
import HomePageCryptoSec from "./HomePageCryptoSec";
import HomePageGnteeSec from "./HomePageGnteeSec";
import HomePageJoinSec from "./HomePageJoinSec";
import HomePageFooter from "./HomePageFooter";

function HomePage() {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  if (user) history.push("/dashboard");

  return (
    <>
      <HomePageNav />
      <HomePageTopSec />
      <div className="free-stock">
        <p>Get your first stock free. Limitations apply.</p>
      </div>
      <HomePageInvestSec />
      <HomePageCryptoSec />
      <HomePageGnteeSec />
      <HomePageJoinSec />
      <HomePageFooter />
    </>
  );
}

export default HomePage;
