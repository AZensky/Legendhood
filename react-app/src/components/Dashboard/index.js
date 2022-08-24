import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardNav from "../DashboardNavbar";
import LineChart from "../LineChart";
import WatchlistStock from "../WatchlistStock";
import NewsArticle from "../NewsArticle";
import ChartTimeLine from "../ChartTimeLine";
import LoadingSpinner from "../LoadingSpinner";
import GraphLoadingSpinner from "../GraphLoadingSpinner";
import Footer from "../Footer";
import {
  unixToDate,
  fetchPastWeekClosingPrices,
  fetchStockData,
  fetchMarketNews,
  fetchLiveStockData,
  fetchPastMonthClosingPrices,
  fetchPastThreeMonthClosingPrices,
  fetchPastYearClosingPrices,
  fetchUserStocks,
  getCommonKeys,
  numberWithCommas,
} from "../../util/stocks-api";
import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [companyData, setCompanyData] = useState([]);
  const [marketNews, setMarketNews] = useState([]);
  const [timeSelection, setTimeSelection] = useState("Live");
  const [timeSelectionLabel, setTimeSelectionLabel] = useState("Live");
  const [prices, setPrices] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);
  const [individualPriceLabels, setIndividualPriceLabels] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [graphLoaded, setGraphLoaded] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [liveDataAvailable, setLiveDataAvailable] = useState(true);
  const [amountChanged, setAmountChanged] = useState(0);
  const [portfolioPercentChanged, setPortfolioPercentChanged] = useState(0);
  const [portfolioMarketValue, setPortfolioMarketValue] = useState(0);

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    let fetchedData = [];

    const getStockData = async (symbol) => {
      let data = await fetchStockData(symbol);
      return data;
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
        if (map[stock] === 0) continue;
        const data = await getStockData(stock);
        data["sharesOwned"] = map[stock];
        const currentPrice = data.c;
        portfolioValue += currentPrice * map[stock];
        fetchedData.push(data);
      }

      setPortfolioMarketValue(portfolioValue.toFixed(2));
    };

    const getMarketNews = async () => {
      let data = await fetchMarketNews();
      setMarketNews(data);
    };

    const initializeDashboard = async () => {
      await getMarketNews();
      await getPortfolioValue();

      setCompanyData(fetchedData);
      setIsLoaded(true);
    };

    initializeDashboard();
  }, []);

  useEffect(() => {
    setGraphLoaded(false);
    // setLiveDataAvailable(true);

    const getUserStocks = async () => {
      let data = await fetchUserStocks(user.id);
      return data;
    };

    const getLiveData = async (userStocks) => {
      let map = {};
      let individualStockArr = [];
      let commonDatetimeLabels = [];
      const individualPricesArr = [];

      for (let stock in userStocks) {
        let res = await fetchLiveStockData(stock);
        console.log("STOCK", stock);
        if (res === "Not Available") {
          console.log("stock", stock);
          setLiveDataAvailable(false);
          setAmountChanged(0);
          setPortfolioPercentChanged(0);
          setTimeSelectionLabel("Live");
          return;
        }

        let quantityOwned = userStocks[stock];
        let closingPrices = res["closingPrices"];
        let datetimeLabels = res["datetimeLabels"];

        let commonDates = getCommonKeys(datetimeLabels, commonDatetimeLabels);
        commonDatetimeLabels = commonDates;

        let stockData = {};

        closingPrices.forEach((price, idx) => {
          stockData[datetimeLabels[idx]] = price;
          map[datetimeLabels[idx]]
            ? (map[datetimeLabels[idx]] += quantityOwned * price)
            : (map[datetimeLabels[idx]] = quantityOwned * price);
        });

        individualStockArr.push(stockData);
      }

      let sharedPrices = [];

      for (let date in map) {
        if (commonDatetimeLabels.includes(date))
          sharedPrices.push([date, map[date]]);
      }

      sharedPrices.sort((a, b) => {
        if (new Date(a[0]) > new Date(b[0])) return 1;
        else return -1;
      });

      sharedPrices = sharedPrices.map((arr) => arr[1]);

      let priceChanged =
        -1 *
        (sharedPrices[0] - sharedPrices[sharedPrices.length - 1]).toFixed(2);
      let perChanged = priceChanged / sharedPrices[0];

      let portPercentChanged = perChanged * 100;

      for (let stock of individualStockArr) {
        let newArr = [];
        for (let datetime in stock) {
          if (commonDatetimeLabels.includes(datetime)) {
            newArr.push(stock[datetime]);
          }
        }
        individualPricesArr.push(newArr);
      }

      setPrices(sharedPrices);
      setTimeLabels(commonDatetimeLabels);
      setIndividualPriceLabels(individualPricesArr);
      setAmountChanged(priceChanged);
      setPortfolioPercentChanged(portPercentChanged.toFixed(2));
      setTimeSelectionLabel("Live");
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
        if (commonDatetimeLabels.includes(date))
          sharedPrices.push([date, map[date]]);
      }

      sharedPrices.sort((a, b) => {
        if (new Date(a[0]) > new Date(b[0])) return 1;
        else return -1;
      });

      sharedPrices = sharedPrices.map((arr) => arr[1]);

      let priceChanged =
        -1 *
        (sharedPrices[0] - sharedPrices[sharedPrices.length - 1]).toFixed(2);
      let perChanged = priceChanged / sharedPrices[0];

      let portPercentChanged = perChanged * 100;

      setPrices(sharedPrices);
      setTimeLabels(commonDatetimeLabels);
      setAmountChanged(priceChanged);
      setPortfolioPercentChanged(portPercentChanged.toFixed(2));
      setTimeSelectionLabel("Past Week");
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
        if (commonDatetimeLabels.includes(date))
          sharedPrices.push([date, map[date]]);
      }

      sharedPrices.sort((a, b) => {
        if (new Date(a[0]) > new Date(b[0])) return 1;
        else return -1;
      });

      sharedPrices = sharedPrices.map((arr) => arr[1]);

      let priceChanged =
        -1 *
        (sharedPrices[0] - sharedPrices[sharedPrices.length - 1]).toFixed(2);
      let perChanged = priceChanged / sharedPrices[0];

      let portPercentChanged = perChanged * 100;

      setPrices(sharedPrices);
      setTimeLabels(commonDatetimeLabels);
      setAmountChanged(priceChanged);
      setPortfolioPercentChanged(portPercentChanged.toFixed(2));
      setTimeSelectionLabel("Past Month");
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
        if (commonDatetimeLabels.includes(date))
          sharedPrices.push([date, map[date]]);
      }

      sharedPrices.sort((a, b) => {
        if (new Date(a[0]) > new Date(b[0])) return 1;
        else return -1;
      });

      sharedPrices = sharedPrices.map((arr) => arr[1]);

      let priceChanged =
        -1 *
        (sharedPrices[0] - sharedPrices[sharedPrices.length - 1]).toFixed(2);
      let perChanged = priceChanged / sharedPrices[0];

      let portPercentChanged = perChanged * 100;

      setPrices(sharedPrices);
      setTimeLabels(commonDatetimeLabels);
      setAmountChanged(priceChanged);
      setPortfolioPercentChanged(portPercentChanged.toFixed(2));
      setTimeSelectionLabel("Past 3 Months");
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
        if (commonDatetimeLabels.includes(date))
          sharedPrices.push([date, map[date]]);
      }

      sharedPrices.sort((a, b) => {
        if (new Date(a[0]) > new Date(b[0])) return 1;
        else return -1;
      });

      sharedPrices = sharedPrices.map((arr) => arr[1]);

      let priceChanged =
        -1 *
        (sharedPrices[0] - sharedPrices[sharedPrices.length - 1]).toFixed(2);
      let perChanged = priceChanged / sharedPrices[0];

      let portPercentChanged = perChanged * 100;

      setPrices(sharedPrices);
      setTimeLabels(commonDatetimeLabels);
      setAmountChanged(priceChanged);
      setPortfolioPercentChanged(portPercentChanged.toFixed(2));
      setTimeSelectionLabel("Past Year");
    };

    const initializeCharts = async () => {
      let userStocks = await getUserStocks();
      if (timeSelection === "Live") await getLiveData(userStocks);
      else if (timeSelection === "1W") await pastWeekClosingPrices(userStocks);
      else if (timeSelection === "1M") await pastMonthClosingPrices(userStocks);
      else if (timeSelection === "3M")
        await pastThreeMonthClosingPrices(userStocks);
      else if (timeSelection === "1Y") await pastYearClosingPrices(userStocks);
      setGraphLoaded(true);
    };

    initializeCharts();
  }, [timeSelection]);

  useEffect(() => {
    if (graphLoaded && isLoaded) setPageLoaded(true);
  }, [graphLoaded, isLoaded]);

  function handleTimeSelection(selection) {
    setTimeSelection(selection);
  }

  return (
    <div className="dashboard-container">
      <DashboardNav />

      {pageLoaded ? (
        <div className="dashboard-content-container">
          <div className="dashboard-left-section">
            {/* User's Portfolio Graph */}
            <div className="portfolio-graph">
              <p className="user-portfolio-market-value">
                ${numberWithCommas(portfolioMarketValue)}
              </p>
              <p
                className={`user-portfolio-percent-changed ${
                  portfolioPercentChanged >= 0 || isNaN(portfolioPercentChanged)
                    ? "positive"
                    : "negative"
                }`}
              >
                {amountChanged >= 0 && "+"}${numberWithCommas(amountChanged)} (
                {portfolioPercentChanged >= 0 && "+"}
                {isNaN(portfolioPercentChanged)
                  ? 0
                  : portfolioPercentChanged}%) {timeSelectionLabel}
              </p>
              {graphLoaded ? (
                <div className="dashboard-chart-container">
                  {timeSelection === "Live" && liveDataAvailable && (
                    <LineChart labels={timeLabels} prices={prices} />
                  )}
                  {timeSelection === "Live" && !liveDataAvailable && (
                    <div className="dashboard-no-live-data">
                      <p>Market is currently closed, no live data available</p>
                    </div>
                  )}

                  {timeSelection !== "Live" && (
                    <LineChart labels={timeLabels} prices={prices} />
                  )}
                </div>
              ) : (
                <div className="dashboard-chart-container">
                  <GraphLoadingSpinner />
                </div>
              )}
              <ChartTimeLine
                handleClick={handleTimeSelection}
                time={timeSelection}
                delta={amountChanged}
                graphLoaded={graphLoaded}
              />
            </div>

            {/* User's Buying Power */}
            <div className="dashboard-buying-power-container">
              <p>Buying Power</p>
              <p>${user && numberWithCommas(user.buyingPower.toFixed(2))}</p>
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
                companyData.map((company, idx) => (
                  <Link
                    key={idx}
                    to={`/stocks/${company.name}`}
                    className="dashboard-watchlist-stock-link"
                  >
                    <WatchlistStock
                      key={company.name}
                      name={company.name}
                      currentPrice={company.c.toFixed(2)}
                      percentChanged={company.dp.toFixed(2)}
                      sharesOwned={company.sharesOwned}
                      labels={timeLabels}
                      prices={individualPriceLabels[idx]}
                      liveDataAvailable={liveDataAvailable}
                    />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
      {pageLoaded && <Footer />}
    </div>
  );
}

export default Dashboard;
