import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetailsPage.css"

function AddToWatchListForm({ quote }) {
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
                className="details-page-watch-list-form"
            >
                <label className="details-page-buy-sell-stock">Shares
                    <input
                        type=""
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

export default AddToWatchListForm;
