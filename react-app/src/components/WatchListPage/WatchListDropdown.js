import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteOneWatchlist } from "../../store/watchlist";
import "./WatchListPage.css";

function WatchListDropdown({ watchlistName, watchlist_Id }) {

  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  //Dropdown state
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => { setShowMenu(false); };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  //onClick fucntions
  function deleteList(e) {
    dispatch(deleteOneWatchlist(watchlist_Id))
    history.push("/dashboard")
  }

  return (
    <>
      <button className={showMenu ? "watchlist-button dropdown-open" : "watchlist-button dropdown-close"} onClick={openMenu}>
        ···
      </button>

      {showMenu && (
        <>
          <div className="watchlist-dropdown-content">

            {/* <div className="watchlist-dropdown-card">
              <div className="watchlist-dropdown-card-content">
                <i class="fa-solid fa-circle-xmark"></i>
              </div>
              <div className="watchlist-dropdown-card-content">
                <button className="watchlist-button" >Edit {watchlistName}</button>
              </div>
            </div> */}

            <div className="watchlist-dropdown-card">
              <div className="watchlist-dropdown-card-content">
                <button className="watchlist-button" onClick={deleteList}>
                  <span className="watchlist-dropdown-x-mark">
                    <i class="fa-solid fa-circle-xmark"></i>
                  </span>
                  <span className="watchlist-dropdown-span">
                    Delete {watchlistName}
                  </span>
                </button>
              </div>
            </div>

          </div>
        </>
      )}

    </>
  );
}

export default WatchListDropdown;
