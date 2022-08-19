import React from "react";
import HomePageNav from "./HomePageNav";
import HomePageTopSec from "./HomePageTopSec";
import HomePageInvestSec from './HomePageInvestSec'
import './HomePage.css'
import HomePageCryptoSec from "./HomePageCryptoSec";
import HomePageGnteeSec from "./HomePageGnteeSec";
import HomePageJoinSec from "./HomePageJoinSec";
import HomePageFooter from "./HomePageFooter";

function HomePage() {
  return (
    <>
      <HomePageNav />
      <HomePageTopSec />
      <div className='free-stock'>
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
