import React from "react";
import { ReactComponent as RobinhoodLogo } from "../../assets/RBLogo.svg";
import "./DashboardNav.css";

function DashboardNav() {
  return (
    <div className="dashboard-nav-container">
      {/* left section of navbar */}
      <div className="dashboard-nav-logo-search-container">
        <div className="rb-logo-container">
          <RobinhoodLogo className="dashboard-rb-logo" />
        </div>
        <form className="stock-search-form">
          <i className="fa-solid fa-magnifying-glass"></i>
          <label>
            <input type="text" className="stock-search" placeholder="Search" />
          </label>
        </form>
      </div>

      {/* right side of navbar */}
      <div className="social-links-account-container">
        <p>Github</p>
        <p>Account</p>
        <p>Logout</p>
      </div>
    </div>
  );
}

export default DashboardNav;
