import { fetchStockData, fetchCompanyDataWatchlist } from "../util/stocks-api"

const CLEAR_CURRENT_WATCHLIST = 'watchlist/CLEAR_CURRENTWATCHLIST'
const SET_CURRENT_WATCHLIST = 'watchlist/SET_CURRENT_WATCHLIST'
const LOAD_WATCHLISTS = 'watchlist/LOAD_WATCHLISTS'
const DELETE_WATCHLIST_STOCK = 'watchlist/DELETE_WATCHLIST_STOCK'

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

const deleteStockFromWatchlist = (id) => ({
    type: DELETE_WATCHLIST_STOCK,
    payload: id
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
            let res = await fetchCompanyDataWatchlist(stock.symbol)
            stock.name = res["name"]
            stock.currentPrice = data["c"]
            stock.percentChange = data["dp"]
            stock.marketCap = res["marketCapitalization"]
        }
        dispatch(setCurrentWatchlist(watchlist))
    }
}

export const loadWatchlists = () => async (dispatch) => {
    console.log("BEFORE THE IF!")
    const response = await fetch(`/api/watchlists`)
    if (response.ok) {
        const watchlists = await response.json();
        console.log("HBKBHJBNLJJHVIBKB", watchlists)
        dispatch(loadAllWatchlists(watchlists.watchlists))
        return watchlists
    } else {
        console.log("NOOOOOOOOOOOOOOOOOOOOOOOOO")
    }

}

export const deleteOneStock = (watchlistId, stocksym) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/${watchlistId}/${stocksym}/delete`, { method: 'DELETE' });

    if (response.ok) {
        dispatch(deleteStockFromWatchlist(watchlistId, stocksym))
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
            newState = {watchlists: action.payload }
            return newState;
        // case DELETE_WATCHLIST_STOCK:
        //     const stocktodelete =
        // // case CLEAR_CURRENT_WATCHLIST:
        // //     newState = { ...state, currentWatchlist: null }
        // //     return newState
        default:
            return state;
    }
}
