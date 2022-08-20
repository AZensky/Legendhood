import React, { useState } from "react";
import { ReactComponent as RobinhoodLogo } from "../../assets/RBLogo.svg";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';
import './DashboardNav.css'

function DashboardNav() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const onLogout = async (e) => {
    await dispatch(logout())
      .then(history.push('/'));
  };

  return (
    <div className="dashboard-nav-container">
      {/* left section of navbar */}
      <div className="dashboard-nav-logo-search-container">
        <div className="rb-logo-container">
          <RobinhoodLogo className="dashboard-rb-logo" />
        </div>
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
        <button>Account</button>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default DashboardNav;
