import React, { useState } from "react";
import { ReactComponent as RobinhoodLogo } from "../../assets/LegendhoodLogo.svg";
import { Link } from 'react-router-dom';
import AccountDropdown from "../AccountButton/AccountDropdown";
import './DashboardNav.css'
import SearchBar from "../SearchBar";

function DashboardNav() {
  return (
    <div className="dashboard-nav-container">
      {/* left section of navbar */}
      <div className="dashboard-nav-logo-search-container">
        <Link to='/' className="rb-logo-container">
          <RobinhoodLogo className="dashboard-rb-logo" />
        </Link>
        <SearchBar />
      </div>

      {/* right side of navbar */}
      <div className="social-links-account-container">
        <a href='https://github.com/AZensky/RobinhoodClone'>Github</a>
        <AccountDropdown />
      </div>
    </div>
  );
}

export default DashboardNav;
