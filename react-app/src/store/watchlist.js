import { fetchStockData, fetchCompanyDataWatchlist } from "../util/stocks-api";

const CLEAR_CURRENT_WATCHLIST = "watchlist/CLEAR_CURRENTWATCHLIST";
const SET_CURRENT_WATCHLIST = "watchlist/SET_CURRENT_WATCHLIST";
const LOAD_WATCHLISTS = "watchlist/LOAD_WATCHLISTS";
const CREATE_WATCHLIST = "watchlist/CREATE_WATCHLIST";
const EDIT_WATCHLIST = "watchlist/EDIT_WATCHLIST";
const DELETE_WATCHLIST = "watchlist/DELETE_WATCHLIST";
const DELETE_WATCHLIST_STOCK = "watchlist/DELETE_WATCHLIST_STOCK";

// Actions
const unsetCurrentWatchlist = () => ({
  type: CLEAR_CURRENT_WATCHLIST,
  payload: null,
});

const setCurrentWatchlist = (watchlist) => ({
  type: SET_CURRENT_WATCHLIST,
  payload: watchlist,
});

const loadAllWatchlists = (watchlists) => ({
  type: LOAD_WATCHLISTS,
  payload: watchlists,
});

const createWatchlist = (watchlist) => ({
  type: CREATE_WATCHLIST,
  payload: watchlist,
});

const editWatchlist = (id, watchlist) => ({
  type: EDIT_WATCHLIST,
  payload: { id, watchlist },
});

const deleteWatchlist = (id) => ({
  type: DELETE_WATCHLIST,
  payload: id,
});

const deleteStockFromWatchlist = (watchlistId, stocksym) => ({
  type: DELETE_WATCHLIST_STOCK,
  payload: { watchlistId, stocksym },
});

// Thunks
export const clearCurrentWatchlist = () => (dispatch) => {
  dispatch(unsetCurrentWatchlist());
};

export const getWatchlist = (id) => async (dispatch) => {
  dispatch(unsetCurrentWatchlist());

  const response = await fetch(`/api/watchlists/${id}`);
  if (response.ok) {
    const watchlist = await response.json();
    for (let stock of watchlist.watchlistStocks) {
      let data = await fetchStockData(stock.symbol);
      let res = await fetchCompanyDataWatchlist(stock.symbol);
      stock.name = res["name"];
      stock.currentPrice = data["c"];
      stock.percentChange = data["dp"];
      stock.marketCap = res["marketCapitalization"];
    }
    dispatch(setCurrentWatchlist(watchlist));
    return watchlist;
  } else return;
};

export const loadWatchlists = () => async (dispatch) => {
  const response = await fetch("/api/watchlists");
  if (response.ok) {
    const watchlists = await response.json();
    dispatch(loadAllWatchlists(watchlists.watchlists));
    return watchlists;
  }
};

export const createOneWatchlist = (payload) => async (dispatch) => {
  const { name } = payload;
  const response = await fetch("/api/watchlists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });
  if (response.ok) {
    const watchlist = await response.json();
    dispatch(createWatchlist(watchlist));
    return watchlist;
  } else if (response.status < 500) {
    const errordata = await response.json();
    if (errordata.errors) {
      return errordata.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const editOneWatchlist = (id, payload) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const watchlist = await response.json();
    dispatch(editWatchlist(id, watchlist));
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const deleteOneWatchlist = (id) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteWatchlist(id));
  }
};

export const deleteOneStock = (watchlistId, stocksym) => async (dispatch) => {
  const response = await fetch(
    `/api/watchlists/${watchlistId}/stocks/${stocksym}`,
    { method: "DELETE" }
  );

  if (response.ok) {
    dispatch(deleteStockFromWatchlist(watchlistId, stocksym));
  }
};

export const deleteOneStockFromDetailsPage =
  (watchlistId, stocksym) => async (dispatch) => {
    const response = await fetch(
      `/api/watchlists/${watchlistId}/stocks/${stocksym}`,
      { method: "DELETE" }
    );

    if (response.ok) {
      dispatch(loadWatchlists());
    }
  };

export const createOneStock = (payload) => async (dispatch) => {
  const { symbol, watchlist_id } = payload;
  const stocksym = symbol;
  const watchlistId = watchlist_id;
  const response = await fetch(
    `/api/watchlists/${watchlistId}/stocks/${stocksym}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol,
        watchlist_id,
      }),
    }
  );
  if (response.ok) {
    await dispatch(loadWatchlists());
  }
};

// Reducer
const initialState = { watchlists: [], currentWatchlist: null };

export default function watchlistRuducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_CURRENT_WATCHLIST:
      newState = { ...state, currentWatchlist: action.payload };
      return newState;
    case EDIT_WATCHLIST:
      newState = {
        ...state,
        currentWatchlist: {
          ...state.currentWatchlist,
          name: action.payload.watchlist.name,
        },
      };
      return newState;
    case LOAD_WATCHLISTS:
      newState = { ...state, watchlists: action.payload };
      return newState;
    case CREATE_WATCHLIST:
      let watchlists = state.watchlists;
      newState = { ...state, watchlists: [...watchlists, action.payload] };
      return newState;
    case DELETE_WATCHLIST:
      const listtodelete = state.watchlists.find(
        (list) => list.id === +action.payload
      );
      let newwatchlists = state.watchlists.filter((f) => f !== listtodelete);
      newState = { ...state, watchlists: newwatchlists };
      return newState;
    case DELETE_WATCHLIST_STOCK:
      const stocktodelete = state.currentWatchlist.watchlistStocks.find(
        (stock) => stock.symbol === action.payload.stocksym
      );
      let newWatchlistStocks = state.currentWatchlist.watchlistStocks.filter(
        (f) => f !== stocktodelete
      );
      newState = {
        ...state,
        currentWatchlist: {
          ...state.currentWatchlist,
          watchlistStocks: newWatchlistStocks,
        },
      };
      return newState;
    case CLEAR_CURRENT_WATCHLIST:
      newState = { ...state, currentWatchlist: null };
      return newState;
    default:
      return state;
  }
}
