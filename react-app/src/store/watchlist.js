import { fetchStockData, fetchCompanyData } from "../util/stocks-api"

const CLEAR_CURRENT_WATCHLIST = 'watchlist/CLEAR_CURRENTWATCHLIST'
const SET_CURRENT_WATCHLIST = 'watchlist/SET_CURRENT_WATCHLIST'
const LOAD_WATCHLISTS = 'watchlist/LOAD_WATCHLISTS'

// Actions
const unsetCurrentWatchlist = () => ({
    type: CLEAR_CURRENT_WATCHLIST,
    payload: null,
})

const setCurrentWatchlist = (watchlist) => ({
    type: SET_CURRENT_WATCHLIST,
    payload: watchlist,
})

const loadAllWatchlists = (watchlists) => ({
    type: LOAD_WATCHLISTS,
    payload: watchlists
})


// Thunks
export const clearCurrentWatchlist = () => (dispatch) => {
    dispatch(unsetCurrentWatchlist())
}

export const getWatchlist = (id) => async (dispatch) => {
    dispatch(unsetCurrentWatchlist())

    const response = await fetch(`/api/watchlists/${id}`);
    if (response.ok) {
        const watchlist = await response.json();
        for (let stock of watchlist.watchlistStocks) {
            let data = await fetchStockData(stock.symbol)
            let res = await fetchCompanyData(stock.symbol)
            stock.name = res["Name"]
            stock.currentPrice = data["c"]
            stock.percentChange = data["dp"]
            stock.marketCap = res["MarketCapitalization"]
        }
        dispatch(setCurrentWatchlist(watchlist))
    }
}

export const loadWatchlists = () => async (dispatch) => {
    const response = await fetch(`/api/watchlists`)
    if (response.ok) {
        const watchlists = await response.json();
        dispatch(loadAllWatchlists(watchlists.watchlists))
    }

}

// Reducer
const initialState = { watchlists: [], currentWatchlist: null };

export default function watchlistRuducer(state = initialState, action) {
    let newState;
    switch (action.type) {

        case SET_CURRENT_WATCHLIST:
            newState = { ...state, currentWatchlist: action.payload }
            return newState;
        case LOAD_WATCHLISTS:
            newState = { ...state, watchlists: action.payload }
            return newState;
        case CLEAR_CURRENT_WATCHLIST:
            newState = { ...state, currentWatchlist: null }
            return newState
        default:
            return state;
    }
}