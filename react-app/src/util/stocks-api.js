// Convert unix timestamp to readable date
export const unixToDate = (unixTime) => {
  const milliseconds = unixTime * 1000;
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleString();
  return humanDateFormat;
};

// Get a company's data, useful for getting the current price and percent changed.
export const fetchStockData = async (symbol) => {
  let res = await fetch(`/api/finnhub/stock-data/${symbol}`);
  let data = await res.json();
  data["name"] = symbol;

  return data;
};

// Fetch the first 5 stories from top market news
export const fetchMarketNews = async () => {
  let res = await fetch("/api/finnhub/market-news");
  let data = await res.json();
  let topNews = data.slice(0, 5);
  return topNews;
};

// Get a company's closing prices for the past week
export const fetchPastWeekClosingPrices = async (symbol) => {
  let res = await fetch(`/api/finnhub/candlestick-data/week/${symbol}`);
  let data = await res.json();
  console.log("PAST WEEK DATA", data);
  let closingPrices = data.c;
  let datetimes = data.t;

  let datetimeLabels = [];

  datetimes.forEach((unixtime) => {
    let datetime = unixToDate(unixtime);
    datetimeLabels.push(datetime);
  });

  return { closingPrices: closingPrices, datetimeLabels: datetimeLabels };
};

// Get a company's closing prices for the past month
export const fetchPastMonthClosingPrices = async (symbol) => {
  let res = await fetch(`/api/finnhub/candlestick-data/one-month/${symbol}`);
  let data = await res.json();
  let closingPrices = data.c;
  let datetimes = data.t;

  let datetimeLabels = [];

  datetimes.forEach((unixtime) => {
    let datetime = unixToDate(unixtime);
    datetimeLabels.push(datetime);
  });

  return { closingPrices: closingPrices, datetimeLabels: datetimeLabels };
};

// Get a company's closing prices for the past three months
export const fetchPastThreeMonthClosingPrices = async (symbol) => {
  let res = await fetch(`/api/finnhub/candlestick-data/three-month/${symbol}`);
  let data = await res.json();
  let closingPrices = data.c;
  let datetimes = data.t;

  let datetimeLabels = [];

  datetimes.forEach((unixtime) => {
    let datetime = unixToDate(unixtime);
    datetimeLabels.push(datetime);
  });

  return { closingPrices: closingPrices, datetimeLabels: datetimeLabels };
};

// Get a company's closing prices for the past year
export const fetchPastYearClosingPrices = async (symbol) => {
  let res = await fetch(`/api/finnhub/candlestick-data/year/${symbol}`);
  let data = await res.json();
  let closingPrices = data.c;
  let datetimes = data.t;

  let datetimeLabels = [];

  datetimes.forEach((unixtime) => {
    let datetime = unixToDate(unixtime);
    datetimeLabels.push(datetime);
  });

  return { closingPrices: closingPrices, datetimeLabels: datetimeLabels };
};
