// Convert unix timestamp to readable date
export const unixToDate = (unixTime) => {
  const milliseconds = unixTime * 1000;
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleString();
  return humanDateFormat;
};

// Function to get common keys amongst objects
export const getCommonKeys = (dateArr, sharedArr) => {
  if (sharedArr.length === 0) return dateArr;
  else {
    let newCommonKeys = [];
    for (let datetime of dateArr) {
      if (sharedArr.includes(datetime)) {
        newCommonKeys.push(datetime);
      }
    }
    return newCommonKeys;
  }
};

// Get all stocks owned by a user
export const fetchUserStocks = async (userId) => {
  let res = await fetch(`/api/portfolio/${userId}`);
  let data = await res.json();
  let assets = data["Assets"];

  let userStocks = {};
  for (let asset of assets) {
    userStocks[asset.symbol]
      ? (userStocks[asset.symbol] += asset.quantity)
      : (userStocks[asset.symbol] = asset.quantity);
  }

  return userStocks;
};

// Get a company's data, useful for getting the current price and percent changed.
export const fetchStockData = async (symbol) => {
  let res = await fetch(`/api/finnhub/stock-data/${symbol}`);
  let data = await res.json();
  data["name"] = symbol;

  return data;
};

// Get a company's profile, useful for watchlist
export const fetchCompanyProfile = async (symbol) => {
  let res = await fetch(`/api/finnhub/company-profile/${symbol}`);
  let data = await res.json();

  return data;
};

// Fetch the first 5 stories from top market news
export const fetchMarketNews = async () => {
  let res = await fetch("/api/finnhub/market-news");
  let data = await res.json();
  let topNews = data.slice(0, 5);
  return topNews;
};

// Get a company's live data (past day)
export const fetchLiveStockData = async (symbol) => {
  let res = await fetch(`/api/finnhub/candlestick-data/live/${symbol}`);
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

// Get a company's closing prices for the past week
export const fetchPastWeekClosingPrices = async (symbol) => {
  let res = await fetch(`/api/finnhub/candlestick-data/week/${symbol}`);
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

//Get company data
export const fetchCompanyData = async (symbol) => {
  let res = await fetch(`/api/finnhub/company-data/${symbol}`);
  let data = await res.json();
  return data;
}
