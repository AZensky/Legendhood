const SET_PORTFOLIO = 'portfolio/SET_PORTFOLIO';

const setPortfolio = (portfolio) => ({
  type: SET_PORTFOLIO,
  payload: portfolio
});

export const purchaseSellStocksThunk = (order) => async (dispatch) => {
    const response = await fetch(`/api/portfolio/${order.user_id}/stocks`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })

    const data = await response.json();
    if (response.ok) {
        await dispatch(getUserPortfolioThunk(order.user_id))
        return data;
    } else {
        return data;
    }
}

export const getUserPortfolioThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/portfolio/${userId}`)

    const data = await response.json();
    if (response.ok) {
        await dispatch(setPortfolio(data))
        return data;
    } else {
        return data;
    }
}



const initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case SET_PORTFOLIO:
        const newportfolio = {}
        action.payload.Assets.forEach(ele => {
            if (newportfolio[ele.symbol]) {
                newportfolio[ele.symbol].quantity += ele.quantity
            } else {
                newportfolio[ele.symbol] = ele
            }
        });
        return newportfolio
      default:
        return state;
    }
  }
