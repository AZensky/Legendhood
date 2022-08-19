import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetailsPage.css"

function BuySellForm({ quote }) {
    const { symbol } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [shares, setShares] = useState(0)
    const [buySell, setBuySell] = useState("Buy")

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
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
                </label>
                <div className="details-page-buy-sell-stock-market-price">
                    <span>Market Price</span>
                    <span>${quote.c}</span>
                </div>
                <div>
                    <span>Estimated Cost</span>
                    <span>${shares * quote.c}</span>
                </div>
                <button className="details-page-buy-sell-stock">
                    {buySell === "Buy" ? "Place Order" : "Sell Stock"}
                </button>
                <div>
                    { } buying power available
                </div>
            </form>
        </>
    );
}

export default BuySellForm;
