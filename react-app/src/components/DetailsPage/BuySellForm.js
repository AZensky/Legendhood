import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./DetailsPage.css"
import { purchaseSellStocksThunk, getUserPortfolioThunk } from "../../store/portfolio";
import { authenticate } from "../../store/session";

function BuySellForm({ quote }) {
    const { symbol } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [shares, setShares] = useState(0)
    const [buySell, setBuySell] = useState("Buy")
    const [ownedStocks, setOwnedStocks] = useState(0)


    const dispatch = useDispatch()
    let user = useSelector(state => state.session.user)
    let portfolio = useSelector(state => state.portfolio)

    useEffect(() => {

        const getPortfolio = async () => {
            await dispatch(getUserPortfolioThunk(user.id))
            const stocks = portfolio[symbol]? portfolio[symbol].quantity : 0;
            setOwnedStocks(stocks);
        }

        if (user) {
            getPortfolio()
        }

        setIsLoaded(true)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const order = {
            symbol: symbol.toUpperCase(),
            quantity: buySell === "Buy" ? shares : -shares,
            price: (quote.c).toFixed(2),
            user_id: user.id
        }
        if (buySell === "Buy") {
            const result = await dispatch(purchaseSellStocksThunk(order))
            console.log(result)
        } else {
            const result = await dispatch(purchaseSellStocksThunk(order))
            console.log(result)
        }
        await dispatch(authenticate())
    }


    return isLoaded && (
        <>
            <form
                onSubmit={handleSubmit}
                className="details-page-buy-sell-stock-form"
            >
                <div className="details-page-buy-sell-switch">
                    <div
                        className={`details-page-buy-${buySell === "Buy" ? "active" : "inactive"}`}
                        onClick={() => setBuySell("Buy")}
                    >
                        Buy {symbol}
                    </div>
                    <div
                        className={`details-page-sell-${buySell === "Sell" ? "active" : "inactive"}`}
                        onClick={() => setBuySell("Sell")}
                    >
                        Sell {symbol}
                    </div>
                </div>
                <label className="details-page-buy-sell-stock">Shares
                    <input
                        onChange={e => setShares(e.target.value)}
                        value={shares}
                    >
                    </input>
                    <div
                        className=""
                        style={{visibility: buySell === "Sell"? "visible" : "hidden"}}
                    >
                        {`(${portfolio[symbol]? portfolio[symbol].quantity : 0} Shares owned)`}
                    </div>
                </label>
                <div className="details-page-buy-sell-stock-market-price">
                    <span>Market Price</span>
                    <span> ${quote.c}</span>
                </div>
                <div>
                    <span>Estimated Cost</span>
                    <span> ${(shares * quote.c).toFixed(2)}</span>
                </div>
                <button className="details-page-buy-sell-stock">
                    {buySell === "Buy" ? "Place Order" : "Sell Stock"}
                </button>
                <div>
                    ${user.buyingPower.toFixed(2)} buying power available
                </div>
            </form>
        </>
    );
}

export default BuySellForm;
