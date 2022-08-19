import React from "react"
import "./WatchListPage.css";

function WatchListPage() {

    return (
        <div className="watchlist-container">
            <div className="watchlist-scrolllist">

                <div>
                    <img className="watchlist-lightning-logo" alt="⚡" src="https://cdn.robinhood.com/emoji/v0/128/26a1.png"></img>
                </div>

                <div className="watchlist-scroll-title">
                    <div className="watchlist-scroll-listname">
                        My First List
                    </div>
                    <div className="watchlist-scroll-ellipsisicon">
                        <button className="watchlist-button">...</button>
                    </div>


                </div>

                <div className="watchlist-itemnum">5 items</div>

                <div>
                    <table className="watchlist-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Symbol</th>
                                <th>Price</th>
                                <th>Today</th>
                                <th>Market Cap</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >Gamestop</td>
                                <td>GME</td>
                                <td>$41.88</td>
                                <td>-0.76%</td>
                                <td>12.74B</td>
                                <td>
                                    <button className="watchlist-button">x</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Amazon</td>
                                <td>AMZN</td>
                                <td>$141.72</td>
                                <td>-2.12%</td>
                                <td>1.44T</td>
                                <td>
                                    <button className="watchlist-button">x</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Apple</td>
                                <td>AAPL</td>
                                <td>$173.88</td>
                                <td>+0.48%</td>
                                <td>2.79T</td>
                                <td>
                                    <button className="watchlist-button">x</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Meta</td>
                                <td>META</td>
                                <td>$174.87</td>
                                <td>-2.55%</td>
                                <td>470.32B</td>
                                <td>
                                    <button className="watchlist-button">x</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Tesla</td>
                                <td>TSLA</td>
                                <td>$883.28</td>
                                <td>-2.81%</td>
                                <td>948.94B</td>
                                <td>
                                    <button className="watchlist-button">x</button>
                                </td>
                            </tr>


                        </tbody>
                    </table>
                </div>
            </div>

            <div className="watchlist-stickylist">
                <div className="watchlist-sticky-center">
                    <div className="watchlist-sticky-title">
                        <div className="list">
                            Lists
                        </div>
                        <div className="watchlis-sticky-plus-sign">
                            <button className="watchlist-button">+</button>
                        </div>
                    </div>

                    <div className="watchlist-list-card">
                        <div>
                            <img className="watchlist-lightning-logo-2" alt="⚡" src="https://cdn.robinhood.com/emoji/v0/128/26a1.png"></img>
                        </div>
                        <div className="watchlist-list-name">
                            My watch list
                        </div>
                        <div className="hide">
                            ...
                        </div>

                    </div>
                </div>
            </div>

        </div >
    )
}

export default WatchListPage