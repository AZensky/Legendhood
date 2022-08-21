import React, { useEffect, useState } from "react";
import DashboardNav from "../DashboardNavbar";
import LineChart from "../LineChart";
import WatchlistStock from "../WatchlistStock";
import NewsArticle from "../NewsArticle";
import ChartTimeLine from "../ChartTimeLine";
import LoadingSpinner from "../LoadingSpinner";
import GraphLoadingSpinner from "../GraphLoadingSpinner";
import { unixToDate } from "../../util/stocks-api";
import "./Dashboard.css";

function Dashboard() {
  const [companyData, setCompanyData] = useState([]);
  const [marketNews, setMarketNews] = useState([]);
  // const [tickDataToday, setTickDataToday] = useState([]);
  const [timeSelection, setTimeSelection] = useState("1W");
  const [prices, setPrices] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [graphLoaded, setGraphLoaded] = useState(false);

  useEffect(() => {
    const stocks = ["AAPL", "TSLA", "AMZN", "META"];
    let fetchedData = [];

    const getStockData = async (symbol) => {
      let res = await fetch(`/api/finnhub/stock-data/${symbol}`);
      let data = await res.json();
      data["name"] = symbol;
      fetchedData.push(data);

      if (fetchedData.length === stocks.length) {
        setCompanyData(fetchedData);
      }
    };

    const getMarketNews = async () => {
      let res = await fetch("/api/finnhub/market-news");
      let data = await res.json();
      let topNews = data.slice(0, 5);
      setMarketNews(topNews);
    };

    for (let stock of stocks) {
      getStockData(stock);
    }

    // const initalizeDashboard = async () => {
    //   await getMarketNews();
    // };

    // initalizeDashboard();

    getMarketNews();
  }, []);

  useEffect(() => {
    setGraphLoaded(false);

    const todayTickData = async (symbol) => {
      let res = await fetch(`/api/finnhub/today-tick/${symbol}`);
      let data = await res.json();
      // console.log("TICK", data);
    };

    const pastMonthClosingPrices = async (symbol) => {
      let res = await fetch(
        `/api/finnhub/candlestick-data/one-month/${symbol}`
      );
      let data = await res.json();
      let closingPrices = data.c;
      let datetimes = data.t;

      let datetimeLabels = [];

      datetimes.forEach((unixtime) => {
        let datetime = unixToDate(unixtime);
        datetimeLabels.push(datetime);
      });

      setPrices(closingPrices);
      setTimeLabels(datetimeLabels);
    };

    const pastWeekClosingPrices = async (symbol) => {
      let res = await fetch(`/api/finnhub/candlestick-data/week/${symbol}`);
      let data = await res.json();
      let closingPrices = data.c;
      let datetimes = data.t;

      let datetimeLabels = [];

      datetimes.forEach((unixtime) => {
        let datetime = unixToDate(unixtime);
        datetimeLabels.push(datetime);
      });

      setPrices(closingPrices);
      setTimeLabels(datetimeLabels);
    };

    const initializeCharts = async () => {
      // await todayTickData("AAPL");
      if (timeSelection === "1W") await pastWeekClosingPrices("AAPL");
      else if (timeSelection === "1M") await pastMonthClosingPrices("AAPL");
      setIsLoaded(true);
      setGraphLoaded(true);
    };

    initializeCharts();
  }, [timeSelection]);

  // console.log("COMPANY DATA", companyData);
  // console.log("MARKET NEWS", marketNews);
  // console.log("CHART DATA", weekClosingData);

  function handleTimeSelection(selection) {
    setTimeSelection(selection);
  }

  console.log("TIME SELECTION", timeSelection);

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
              <ChartTimeLine handleClick={handleTimeSelection} />
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
