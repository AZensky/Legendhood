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
    const [errors, setErrors] = useState([])


    const dispatch = useDispatch()
    let user = useSelector(state => state.session.user)
    let portfolio = useSelector(state => state.portfolio)

    useEffect(() => {
        setErrors([])
    }, [buySell, shares])

    useEffect(() => {

        const getPortfolio = async () => {
            await dispatch(getUserPortfolioThunk(user.id))
            const stocks = portfolio[symbol] ? portfolio[symbol].quantity : 0;
            setOwnedStocks(stocks);
        }

        if (user) {
            getPortfolio()
        }

        setIsLoaded(true)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const errorsArr = []

        if (shares < 0 || Number.isInteger(shares)) {
            errorsArr.push("Invalid share quantity. Please input integer values greater than 0")
        }
        if (shares > (portfolio[symbol] ? portfolio[symbol].quantity : 0) && buySell === "Sell") {
            errorsArr.push(`You do not currently own enough stocks. Max quantity to sell: ${portfolio[symbol] ? portfolio[symbol].quantity : 0}`)
        }
        if (shares * quote.c.toFixed(2) > user.buyingPower.toFixed(2) && buySell === "Buy") {
            errorsArr.push(`You do not currently have anough buying power to purchase ${shares} shares. Please reduce the number of stocks to purchase or increase your buying power`)
        }

        if (errorsArr.length > 0) {
            setErrors(errorsArr)
            return
        }

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
                <div className="details-page-buy-in-labels">
                    <div>
                        Buy in:
                    </div>
                    <div>
                        Shares
                    </div>
                </div>
                <label className="details-page-buy-sell-stock">
                    <div className="details-page-buy-sell-stock-label">
                        Shares:
                    </div>
                    <input
                        className="details-page-buy-sell-stock-input"
                        onChange={e => setShares(e.target.value)}
                        value={shares}
                    >
                    </input>
                </label>
                <div
                    className="details-page-buy-sell-stocks-owned"
                    style={{ visibility: buySell === "Sell" ? "visible" : "hidden" }}
                >
                    {`(${portfolio[symbol] ? portfolio[symbol].quantity : 0} Shares owned)`}
                </div>
                <div className="details-page-buy-sell-stock-market-price">
                    <span>Market Price</span>
                    <span> ${quote.c}</span>
                </div>
                <div className="details-page-buy-sell-stock-estimated-cost">
                    <span>Estimated Cost</span>
                    <span> ${(shares * quote.c).toFixed(2)}</span>
                </div>
                {errors.length > 0 && (
                    <div className="details-page-buy-sell-stock-errors">
                        <ul>
                            {errors.map((errorMessage, i) => (
                                <li key={i}>
                                    {errorMessage}
                                </li>
                            ))}

                        </ul>
                    </div>
                )}
                <div className="details-page-buy-sell-stock-button-container">
                    <button className={`details-page-buy-sell-stock button ${quote.d < 0 ? "red" : "green"}`}>
                            {buySell === "Buy" ? "Place Order" : "Sell Stock"}
                    </button>
                </div>
                <div>
                    ${user.buyingPower.toFixed(2)} buying power available
                </div>
            </form>
        </>
    );
}

export default BuySellForm;
