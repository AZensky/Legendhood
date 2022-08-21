const CLEAR_CURRENT_WATCHLIST = 'watchlist/CLEAR_CURRENTWATCHLIST'
const SET_CURRENT_WATCHLIST = 'watchlist/SET_CURRENT_WATCHLIST'

// Actions
const setCurrentWatchlist = (watchlist) => ({
    type: SET_CURRENT_WATCHLIST,
    payload: watchlist,
})

const unsetCurrentWatchlist = () => ({
    type: CLEAR_CURRENT_WATCHLIST,
    payload: null,
})


// Thunks
export const getWatchlist = (id) => async (dispatch) => {
    dispatch(unsetCurrentWatchlist())

    const response = await fetch(`/api/watchlists/${id}`);
    if (response.ok) {
        const watchlist = await response.json();
        dispatch(setCurrentWatchlist(watchlist))
    }
}

export const clearCurrentWatchlist = () => (dispatch) => {
    dispatch(unsetCurrentWatchlist())
}


// Reducer
const initialState = { watchlists: [], currentWatchlist: null };

export default function watchlistRuducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_CURRENT_WATCHLIST:
            newState = { ...state, currentWatchlist: action.payload }
            return newState;
        case clearCurrentWatchlist:
            newState = { ...state, currentWatchlist: null }
            return newState
        default:
            return state;
    }
}