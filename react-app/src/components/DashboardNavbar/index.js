import React, { useState } from "react";
import { ReactComponent as RobinhoodLogo } from "../../assets/RBLogo.svg";
import { Link } from 'react-router-dom';
import AccountDropdown from "../AccountButton/AccountDropdown";
import './DashboardNav.css'

function DashboardNav() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="dashboard-nav-container">
      {/* left section of navbar */}
      <div className="dashboard-nav-logo-search-container">
        <Link to='/' className="rb-logo-container">
          <RobinhoodLogo className="dashboard-rb-logo" />
        </Link>
        <div className="stock-search-form">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            className="stock-search"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
