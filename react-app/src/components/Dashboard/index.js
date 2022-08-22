import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardNav from "../DashboardNavbar";
import LineChart from "../LineChart";
import WatchlistStock from "../WatchlistStock";
import NewsArticle from "../NewsArticle";
import ChartTimeLine from "../ChartTimeLine";
import LoadingSpinner from "../LoadingSpinner";
import GraphLoadingSpinner from "../GraphLoadingSpinner";
import {
  unixToDate,
  fetchPastWeekClosingPrices,
  fetchStockData,
  fetchMarketNews,
  fetchPastMonthClosingPrices,
  fetchPastThreeMonthClosingPrices,
  fetchPastYearClosingPrices,
  fetchUserStocks,
  getCommonKeys,
} from "../../util/stocks-api";
import "./Dashboard.css";

function Dashboard() {
  const [companyData, setCompanyData] = useState([]);
  const [marketNews, setMarketNews] = useState([]);
  const [timeSelection, setTimeSelection] = useState("Live");
  const [prices, setPrices] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [graphLoaded, setGraphLoaded] = useState(false);

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    const stocks = ["AAPL", "TSLA", "AMZN", "META"];
    let fetchedData = [];

    const getStockData = async (symbol) => {
      let data = await fetchStockData(symbol);
      fetchedData.push(data);

      if (fetchedData.length === stocks.length) {
        setCompanyData(fetchedData);
      }
    };

    const getMarketNews = async () => {
      let data = await fetchMarketNews();
      setMarketNews(data);
    };

    for (let stock of stocks) {
      getStockData(stock);
    }

    getMarketNews();
  }, []);

  useEffect(() => {
    setGraphLoaded(false);

    const getUserStocks = async () => {
      let data = await fetchUserStocks(user.id);
      return data;
    };

    const todayTickData = async (symbol) => {
      let res = await fetch(`/api/finnhub/today-tick/${symbol}`);
      let data = await res.json();
      let datetimes = data.t;

      let datetimeLabels = [];

      datetimes.forEach((unixtime) => {
        let datetime = unixToDate(unixtime);
        datetimeLabels.push(datetime);
      });

      setPrices(data.p);
      setTimeLabels(datetimeLabels);
    };

    const pastWeekClosingPrices = async (userStocks) => {
      let map = {};
      let commonDatetimeLabels = [];

      for (let stock in userStocks) {
        let res = await fetchPastWeekClosingPrices(stock);

        let quantityOwned = userStocks[stock];
        let closingPrices = res["closingPrices"];
        let datetimeLabels = res["datetimeLabels"];

        let commonDates = getCommonKeys(datetimeLabels, commonDatetimeLabels);
        commonDatetimeLabels = commonDates;

        closingPrices.forEach((price, idx) => {
          map[datetimeLabels[idx]]
            ? (map[datetimeLabels[idx]] += quantityOwned * price)
            : (map[datetimeLabels[idx]] = quantityOwned * price);
        });
      }

      let sharedPrices = [];

      for (let date in map) {
        if (commonDatetimeLabels.includes(date)) sharedPrices.push(map[date]);
      }

      setPrices(sharedPrices);
      setTimeLabels(commonDatetimeLabels);
    };

    const pastMonthClosingPrices = async (userStocks) => {
      let map = {};
      let commonDatetimeLabels = [];

      for (let stock in userStocks) {
        let res = await fetchPastMonthClosingPrices(stock);

        let quantityOwned = userStocks[stock];
        let closingPrices = res["closingPrices"];
        let datetimeLabels = res["datetimeLabels"];

        let commonDates = getCommonKeys(datetimeLabels, commonDatetimeLabels);
        commonDatetimeLabels = commonDates;

        closingPrices.forEach((price, idx) => {
          map[datetimeLabels[idx]]
            ? (map[datetimeLabels[idx]] += quantityOwned * price)
            : (map[datetimeLabels[idx]] = quantityOwned * price);
        });
      }

      let sharedPrices = [];

      for (let date in map) {
        if (commonDatetimeLabels.includes(date)) sharedPrices.push(map[date]);
      }

      setPrices(sharedPrices);
      setTimeLabels(commonDatetimeLabels);
    };

    const pastThreeMonthClosingPrices = async (userStocks) => {
      let map = {};
      let commonDatetimeLabels = [];

      for (let stock in userStocks) {
        let res = await fetchPastThreeMonthClosingPrices(stock);

        let quantityOwned = userStocks[stock];
        let closingPrices = res["closingPrices"];
        let datetimeLabels = res["datetimeLabels"];

        let commonDates = getCommonKeys(datetimeLabels, commonDatetimeLabels);
        commonDatetimeLabels = commonDates;

        closingPrices.forEach((price, idx) => {
          map[datetimeLabels[idx]]
            ? (map[datetimeLabels[idx]] += quantityOwned * price)
            : (map[datetimeLabels[idx]] = quantityOwned * price);
        });
      }

      let sharedPrices = [];

      for (let date in map) {
        if (commonDatetimeLabels.includes(date)) sharedPrices.push(map[date]);
      }

      setPrices(sharedPrices);
      setTimeLabels(commonDatetimeLabels);
    };

    const pastYearClosingPrices = async (userStocks) => {
      let map = {};
      let commonDatetimeLabels = [];

      for (let stock in userStocks) {
        let res = await fetchPastYearClosingPrices(stock);

        let quantityOwned = userStocks[stock];
        let closingPrices = res["closingPrices"];
        let datetimeLabels = res["datetimeLabels"];

        let commonDates = getCommonKeys(datetimeLabels, commonDatetimeLabels);
        commonDatetimeLabels = commonDates;

        closingPrices.forEach((price, idx) => {
          map[datetimeLabels[idx]]
            ? (map[datetimeLabels[idx]] += quantityOwned * price)
            : (map[datetimeLabels[idx]] = quantityOwned * price);
        });
      }

      let sharedPrices = [];

      for (let date in map) {
        if (commonDatetimeLabels.includes(date)) sharedPrices.push(map[date]);
      }

      setPrices(sharedPrices);
      setTimeLabels(commonDatetimeLabels);
    };

    const initializeCharts = async () => {
      let userStocks = await getUserStocks();
      if (timeSelection === "Live") await todayTickData("AAPL");
      else if (timeSelection === "1W") await pastWeekClosingPrices(userStocks);
      else if (timeSelection === "1M") await pastMonthClosingPrices(userStocks);
      else if (timeSelection === "3M")
        await pastThreeMonthClosingPrices(userStocks);
      else if (timeSelection === "1Y") await pastYearClosingPrices(userStocks);
      setIsLoaded(true);
      setGraphLoaded(true);
    };

    initializeCharts();
  }, [timeSelection]);

  function handleTimeSelection(selection) {
    setTimeSelection(selection);
  }

  return (
    <div className="dashboard-container">
      <DashboardNav />

      {isLoaded ? (
        <div className="dashboard-content-container">
          <div className="dashboard-left-section">
            {/* User's Portfolio Graph */}
            <div className="portfolio-graph">
              <p className="user-portfolio-market-value">$260.91</p>
              <p className={`user-portfolio-percent-changed positive`}>
                +50.38(+23.05%) All time
              </p>
              {graphLoaded ? (
                <div className="dashboard-chart-container">
                  <LineChart labels={timeLabels} prices={prices} />
                </div>
              ) : (
                <div className="dashboard-chart-container">
                  <GraphLoadingSpinner />
                </div>
              )}
              <ChartTimeLine
                handleClick={handleTimeSelection}
                time={timeSelection}
              />
            </div>

            {/* User's Buying Power */}
            <div className="dashboard-buying-power-container">
              <p>Buying Power</p>
              <p>$0.00</p>
            </div>

            <div className="market-news-container">
              {marketNews.length > 0 &&
                marketNews.map((article) => (
                  <NewsArticle
                    key={article.id}
                    headline={article.headline}
                    image={article.image}
                    summary={article.summary}
                    url={article.url}
                    source={article.source}
                  />
                ))}
            </div>
          </div>

          {/* Right Side of Dashboard */}

          <div className="dashboard-right-side-container">
            <div className="dashboard-right-side-content-container">
              <p className="dashboard-right-side-title">Stocks</p>
              {companyData.length > 0 &&
                isLoaded &&
                companyData.map((company) => (
                  <WatchlistStock
                    key={company.name}
                    name={company.name}
                    currentPrice={company.c.toFixed(2)}
                    percentChanged={company.dp.toFixed(2)}
                    sharesOwned={2}
                    labels={timeLabels}
                    prices={prices}
                  />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default Dashboard;
