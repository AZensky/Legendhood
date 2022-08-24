import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./DetailsPage.css"
import { purchaseStocksThunk, sellStocksThunk, getUserPortfolioThunk } from "../../store/portfolio";
import { authenticate } from "../../store/session";
import { numberWithCommas } from "../../util/stocks-api";

function BuySellForm({ quote, amountChanged }) {
    let { symbol } = useParams()
    symbol = symbol.toUpperCase()
    const [isLoaded, setIsLoaded] = useState(false)
    const [shares, setShares] = useState(0)
    const [buySell, setBuySell] = useState("Buy")
    const [ownedStocks, setOwnedStocks] = useState(0)
    const [errors, setErrors] = useState([])
    const [successfulTransaction, setSuccessfulTransaction] = useState(false)
    const [transactionShares, setTransactionShares] = useState(0)


    const dispatch = useDispatch()
    let user = useSelector(state => state.session.user)
    let portfolio = useSelector(state => state.portfolio)

    useEffect(() => {
        setErrors([])
    }, [buySell, shares])

    useEffect(() => {
        setShares("")
    }, [buySell, portfolio])

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
        setSuccessfulTransaction(false)

        const errorsArr = []
        console.log("TESTING", typeof shares, !Number.isInteger(shares))
        if (shares < 0 || !Number.isInteger(shares) || Number(shares.toString()[0]) === 0) {
            errorsArr.push({ "Invalid quantity": "Invalid share quantity. Please input integer values greater than 0" })
            setErrors(errorsArr)
            return
        }
        if (shares > (portfolio[symbol] ? portfolio[symbol].quantity : 0) && buySell === "Sell") {
            errorsArr.push({ "Insufficient stocks": `You do not currently own enough stocks. Max quantity to sell: ${portfolio[symbol] ? portfolio[symbol].quantity : 0}` })
            setErrors(errorsArr)
            return
        }
        if (shares * quote.c.toFixed(2) > user.buyingPower.toFixed(2) && buySell === "Buy") {
            errorsArr.push({ "Insufficient buying power": `Please reduce the number of stocks to purchase or increase your buying power` })
            setErrors(errorsArr)
            return
        }

        const order = {
            symbol: symbol.toUpperCase(),
            quantity: shares,
            price: (quote.c).toFixed(2),
            user_id: user.id
        }



        if (buySell === "Buy") {
            const result = await dispatch(purchaseStocksThunk(order))
            console.log(result)
        } else {
            const result = await dispatch(sellStocksThunk(order))
            console.log(result)
        }
        await dispatch(authenticate())
        console.log(shares)
        setTransactionShares(shares)
        setSuccessfulTransaction(true)
    }


    return isLoaded && (
        <>
            {!successfulTransaction && (<form
                onSubmit={handleSubmit}
                className="details-page-buy-sell-stock-form"
            >
                <div className="details-page-buy-sell-switch">
                    <div
                        className={`details-page-buy ${buySell === "Buy" ? "active" : "inactive"}`}
                        onClick={() => setBuySell("Buy")}
                    >
                        Buy {symbol}
                    </div>
                    <div
                        className={`details-page-sell ${buySell === "Sell" ? "active" : "inactive"}`}
                        onClick={() => setBuySell("Sell")}
                    >
                        Sell {symbol}
                    </div>
                </div>
                <div className="details-page-buy-sell-stock-form-middle">
                    <div className="details-page-buy-in-labels">
                        <div>
                            Buy in
                        </div>
                        <div style={{ fontWeight: "bold" }}>
                            Shares
                        </div>
                    </div>
                    <label className="details-page-buy-sell-stock">
                        <div className="details-page-buy-sell-stock-label">
                            Shares
                        </div>
                        <input
                            type="number"
                            className={`details-page-buy-sell-stock-input ${amountChanged < 0 ? "red" : "green"}`}
                            onChange={e => {
                                setShares(Number(e.target.value))
                            }}
                            min={0}
                            // placeholder={0}
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
                        <span className={`details-page-buy-sell-stock-market-price-label ${amountChanged < 0 ? "red" : "green"}`}>Market Price</span>
                        <span> ${quote.c}</span>
                    </div>
                    <div className="details-page-buy-sell-stock-estimated-cost">
                        <span className="details-page-buy-sell-stock-estimated-cost-label">Estimated Cost</span>
                        <span className="details-page-buy-sell-stock-estimated-cost-label-price"> ${numberWithCommas((shares * quote.c).toFixed(2))}</span>
                    </div>
                    {errors.length > 0 && (
                        <div className="details-page-buy-sell-stock-errors">
                            {errors.map((errorMessage, i) => {
                                const key = Object.keys(errorMessage)[0]
                                const value = Object.values(errorMessage)[0]
                                return (
                                    <div key={i}>
                                        <div key={key} className="details-page-buy-sell-stock-errors-header">
                                            {key}
                                        </div>
                                        <div key={value} className="details-page-buy-sell-stock-errors-message">
                                            {value}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
                <div className="details-page-buy-sell-stock-form-bottom">
                    <div className="details-page-buy-sell-stock-button-container">
                        <button className={`details-page-buy-sell-stock button ${amountChanged < 0 ? "red" : "green"}`}>
                            {buySell === "Buy" ? "Place Order" : "Sell Stock"}
                        </button>
                    </div>
                    <div className="details-page-buy-sell-stock-buying-power-container">
                        <div className="details-page-buy-sell-stock-buying-power-value">
                            ${numberWithCommas(user.buyingPower.toFixed(2))}
                        </div>
                        <div className="details-page-buy-sell-stock-buying-power-text">
                            buying power available
                        </div>
                    </div>
                </div>
            </form>)}
            {successfulTransaction && (
                <div className="details-page-buy-sell-stock-form">
                    <div className="details-page-buy-sell-switch">
                        <div
                            className={`details-page-buy`}
                        >
                            {`${buySell === "Buy" ? "Purchase" : "Sale"} successful`}
                        </div>
                    </div>
                    <div className="details-page-buy-sell-stock-form-middle receipt">
                        <div className="details-page-buy-in-labels">
                            <span className={`details-page-buy-sell-stock-market-price-label`}>{`Amount ${buySell === "Buy" ? "purchased" : "sold"}`}</span>
                            <span>{transactionShares}</span>
                        </div>
                        <div className="details-page-buy-in-labels">
                            <span className={`details-page-buy-sell-stock-market-price-label`}>{`Total ${buySell === "Buy" ? "purchase" : "sale"} price`}</span>
                            <span> ${(quote.c * transactionShares).toFixed(2)}</span>
                        </div>
                        <div className="details-page-buy-in-labels">
                            {`Your ${buySell === "Buy" ? "purchase" : "sale"} of ${shares} ${symbol} shares was successful. You currently own ${portfolio[symbol].quantity} shares of ${symbol}.`}
                        </div>
                        <div className="details-page-buy-sell-stock-button-container">
                            <button
                                className={`details-page-buy-sell-stock button ${amountChanged < 0 ? "red" : "green"}`}
                                onClick={() => setSuccessfulTransaction(false)}
                            >
                                Dismiss
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

export default BuySellForm;
