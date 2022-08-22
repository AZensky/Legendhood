import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import "./AccountDropdown.css";

function AccountDropdown() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState(0);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    const getStockData = async (symbol) => {
      let res = await fetch(`/api/finnhub/stock-data/${symbol}`);
      let data = await res.json();
      let currentPrice = data.c;
      return currentPrice;
    };

    const getPortfolioValue = async () => {
      const res = await fetch(`/api/portfolio/${user.id}`);
      const data = await res.json();
      let assets = data["Assets"];

      let portfolioValue = 0;

      let map = {};

      for (let asset of assets) {
        map[asset.symbol]
          ? (map[asset.symbol] += asset.quantity)
          : (map[asset.symbol] = asset.quantity);
      }

      for (let stock in map) {
        const currentPrice = await getStockData(stock);
        portfolioValue += currentPrice * map[stock];
      }

      setPortfolioValue(portfolioValue.toFixed(2));
    };

    getPortfolioValue();
  }, []);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const onlogout = (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => history.push("/"));
  };

  return (
    <>
      <button className="account-btn" onClick={openMenu}>
        Account
      </button>
      {showMenu && (
        <div className="account-dropdown">
          <h3 className="account-name">
            {user.firstName} {user.lastName}
          </h3>
          <div className="account-balance-summary">
            <div className="account-portfolio-value">
              <h3>{portfolioValue}</h3>
              <div>Portfolio Value</div>
            </div>
            <div className="account-buying-power">
              <h3>{user.buyingPower.toFixed(2)}</h3>
              <div>Buying Power</div>
            </div>
          </div>
          <div className="account-logout-btn">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <button onClick={onlogout}>Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AccountDropdown;
