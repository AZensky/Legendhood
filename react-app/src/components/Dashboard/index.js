import React, { useEffect, useState } from "react";
import DashboardNav from "../DashboardNavbar";
import LineChart from "../LineChart";
import PopularStock from "../PopularStock";
import NewsArticle from "../NewsArticle";
import {
  fetchStockData,
  fetchMarketNews,
  fetchCompanyNews,
} from "../../util/stocks-api";
import "./Dashboard.css";

function Dashboard() {
  const [companyData, setCompanyData] = useState([]);
  const [marketNews, setMarketNews] = useState([]);

  // Utilize the fetch function written in util folder to get the data for the companies from finnhub
  useEffect(() => {
    let fetchedData = [];
    const stocks = ["AAPL", "TSLA", "AMZN", "META"];

    const getStockData = async (stock) => {
      let data = await fetchStockData(stock);
      data["name"] = stock;
      fetchedData.push(data);

      if (fetchedData.length === stocks.length) {
        setCompanyData(fetchedData);
      }
    };

    const getMarketNews = async () => {
      let data = await fetchMarketNews();
      let topNews = data.slice(0, 5);
      setMarketNews(topNews);
    };

    for (let stock of stocks) {
      getStockData(stock);
    }

    // const getCompanyNews = async () => {
    //   let data = await fetchCompanyNews("AAPL");
    //   console.log("COMPANY NEWS", data);
    // };

    getMarketNews();
    // getCompanyNews();
  }, []);

  console.log("COMPANY DATA", companyData);
  console.log("MARKET NEWS", marketNews);

  return (
    <div className="dashboard-container">
      <DashboardNav />

      <div className="dashboard-content-container">
        <div className="dashboard-left-section">
          {/* User's Portfolio Graph */}
          <div className="portfolio-graph">
            <p>$260</p>
            <p>+50.38(+23.05%) All time</p>
            <LineChart />
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
