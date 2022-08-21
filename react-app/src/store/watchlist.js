const GET_WATCHLIST = 'watchlist/GET_WATCHLIST'

const getWatchlist = (watchlist) => ({
    type: GET_WATCHLIST,
    payload: watchlist
})

const initialState = { watchlist: null };

export const getOneWatchlist = (id) => async (dispatch) => {
    const response = await fetch(`/api/watchlist/${id}`);
    if (response.ok) {
        const watchlist = await response.json();
        dispatch(getWatchlist(watchlist))
    }
}