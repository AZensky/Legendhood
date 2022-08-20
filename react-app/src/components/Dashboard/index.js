import React, { useEffect, useState } from "react";
import DashboardNav from "../DashboardNavbar";
import LineChart from "../LineChart";
import PopularStock from "../PopularStock";
import NewsArticle from "../NewsArticle";
import { unixToDate } from "../../util/stocks-api";
import "./Dashboard.css";

function Dashboard() {
  const [companyData, setCompanyData] = useState([]);
  const [marketNews, setMarketNews] = useState([]);
  // const [tickDataToday, setTickDataToday] = useState([]);
  const [weekClosingPrices, setWeekClosingPrices] = useState([]);
  const [weekDateLabels, setWeekDateLabels] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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
      // console.log("CANDLE MONTH", data);
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

      setWeekClosingPrices(closingPrices);
      setWeekDateLabels(datetimeLabels);
    };

    const initalizeDashboard = async () => {
      await getMarketNews();
      await todayTickData("AAPL");
      await pastMonthClosingPrices("AAPL");
      await pastWeekClosingPrices("AAPL");
      setIsLoaded(true);
    };

    initalizeDashboard();
  }, []);

  // console.log("COMPANY DATA", companyData);
  // console.log("MARKET NEWS", marketNews);
  // console.log("CHART DATA", weekClosingData);
  console.log("WEEK CLOSING PRICES", weekClosingPrices);
  console.log("WEEK DATE LABELS", weekDateLabels);

  return (
    <div className="dashboard-container">
      <DashboardNav />

      <div className="dashboard-content-container">
        <div className="dashboard-left-section">
          {/* User's Portfolio Graph */}
          <div className="portfolio-graph">
            <p>$260</p>
            <p>+50.38(+23.05%) All time</p>
            {isLoaded && (
              <LineChart labels={weekDateLabels} prices={weekClosingPrices} />
            )}
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
              companyData.map((company) => (
                <PopularStock
                  key={company.name}
                  name={company.name}
                  currentPrice={company.c}
                  percentChanged={company.dp}
                  sharesOwned={2}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
