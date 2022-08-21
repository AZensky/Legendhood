import React from "react";

function WatchlistStockCard({ name, symbol, price, today, marketcap }) {
    return (
        <tr>
            <td>{name}</td>
            <td>{symbol}</td>
            <td>{price}</td>
            <td>{today}</td>
            <td>{marketcap}</td>
            <td>
                <button className="watchlist-button">x</button>
            </td>
        </tr>
    );
}

export default WatchlistStockCard;