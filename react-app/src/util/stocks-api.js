const alphaAPIKEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
const finnAPIKEY = process.env.REACT_APP_FINNHUB_API_KEY;

// alphaVantage indiviudal company's stock details
export const fetchStockDetails = async (symbol) => {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${alphaAPIKEY}`
  );
  const data = await res.json();
  return data;
};

// finnHub individual company's stock details
export const fetchStockData = async (symbol) => {
  const res = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnAPIKEY}`
  );
  const data = await res.json();
  return data;
};

// finnHub all market news
export const fetchMarketNews = async () => {
  const res = await fetch(
    `https://finnhub.io/api/v1/news?category=general&token=${finnAPIKEY}`
  );
  const data = await res.json();
  return data;
};

//finnHub company news

export const fetchCompanyNews = async (symbol) => {
  const todayDate = new Date();
  const today = todayDate.toISOString().split("T")[0];

  const weekAgo = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    todayDate.getDate() - 7
  )
    .toISOString()
    .split("T")[0];

  const res = await fetch(
    `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${weekAgo}&to=${today}&token=${finnAPIKEY}`
  );
  const data = await res.json();
  return data;
};

export const unixToDate = (unixTime) => {
  const milliseconds = unixTime * 1000;
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleString();
  return humanDateFormat;
};
