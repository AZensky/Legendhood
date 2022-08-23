import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import "./WatchListPage.css";

function WatchListDropdown({ watchlistName }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <button className={showMenu ? "watchlist-button dropdown-open" : "watchlist-button dropdown-close"} onClick={openMenu}>
        ···
      </button>
      {showMenu && (
        <>
          <div className="watchlist-dropdown-content">

            <div className="watchlist-dropdown-card">
              <div className="watchlist-dropdown-card-content test">
                <i class="fa-solid fa-circle-xmark"></i>
              </div>
              <div className="watchlist-dropdown-card-content">
                Edit {watchlistName}
              </div>
            </div>

            <div className="watchlist-dropdown-card">
              <div className="watchlist-dropdown-card-content test">
                <i class="fa-solid fa-circle-xmark"></i>
              </div>
              <div className="watchlist-dropdown-card-content">
                Delete {watchlistName}
              </div>
            </div>

          </div>
        </>
      )}
    </>
  );
}

export default WatchListDropdown;
