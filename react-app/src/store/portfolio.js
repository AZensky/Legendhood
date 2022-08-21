const SET_PORTFOLIO = 'portfolio/SET_PORTFOLIO';

const setPortfolio = (portfolio) => ({
  type: SET_PORTFOLIO,
  payload: portfolio
});

export const purchaseStocksThunk = (order) => async (dispatch) => {
    const response = await fetch(`/api/portfolio/${order.user_id}/stocks`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })

    const data = await response.json();
    console.log("HERE",data)
    if (response.ok) {
        const returnData = await dispatch(getUserPortfolioThunk(order.user_id))
        return returnData;
    } else {
        return data;
    }
}

export const getUserPortfolioThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/portfolio/${userId}`)

    const data = await response.json();
    if (response.ok) {
        const returnData = await dispatch(setPortfolio(data))
        return returnData;
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
            newportfolio[ele.symbol] = ele
        });
        return newportfolio
      default:
        return state;
    }
  }
