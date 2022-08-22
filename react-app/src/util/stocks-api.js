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

<<<<<<< HEAD
// converts numbers to shorthand values. e.g 1520000000 -> 1.52M
export function convertNum(inputNum) {
  let num = Number(inputNum.toString().split(".")[0])
  const lng = num.toString().length

  const denominator = ["", "K", "M", "B", "t", "q", "Q", "s", "S", "o", "n", "d", "U", "D", "T"]

  const denomCheck = Math.floor((lng-1)/3)
  let newnum;
  let decimals;

  if (Number(num.toString()[lng - (1 + 3 * (denomCheck - 1))]) >= 5) {
      const roundedUp = Number(num.toString().slice(0, lng - (1 + 3 * (denomCheck - 1)))) + 1
      newnum = roundedUp.toString().slice(0, lng - 3*denomCheck)
      decimals = roundedUp.toString().slice(lng - 3*denomCheck, lng - (1 + 3 * (denomCheck - 1)))
  } else {
      newnum = num.toString().slice(0, lng - 3*denomCheck)
      decimals = num.toString().slice(lng - 3*denomCheck, lng - (1 + 3 * (denomCheck - 1)))
  }

  return `$${newnum}${lng >= 4? ".":""}${decimals}${denominator[Math.floor((lng-1)/3)]}`
}
=======
export const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//Get company data for detail page
export const fetchCompanyData = async (symbol) => {
  let res = await fetch(`/api/finnhub/company-data/${symbol}`);
  let data = await res.json();
  return data;
}

//Get company data for watchlist
export const fetchCompanyDataWatchlist = async (symbol) => {
  let res = await fetch(`/api/finnhub/company-profile/${symbol}`);
  let data = await res.json();
  return data;
}

>>>>>>> fdd9f18949bbdc36e6e84e117f3f1d1248b32a1f
