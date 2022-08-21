import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearCurrentWatchlist, getWatchlist } from "../../store/watchlist";
import DashboardNav from "../DashboardNavbar";
// import WatchlistStockCard from "./WatchlistStockCard";
import "./WatchListPage.css";

function WatchListPage() {
    const dispatch = useDispatch();

    //get watchlist by id
    const { watchlistId } = useParams();

    useEffect(() => {
        dispatch(getWatchlist(watchlistId))

        return () => {
            dispatch(clearCurrentWatchlist())
        }
    }, [dispatch, watchlistId]);

    //set backend returned data into variable
    const watchlist = useSelector((state) => {
        const currentWatchlist = state.watchlist.currentWatchlist;

        return String(currentWatchlist?.id) === watchlistId ? currentWatchlist : null;
    })

    //render component
    if (!watchlist) {
        return <></>;
    }


    //get all stocks symbols in the watchlist
    const stockSymbols = []
    for (let stock of watchlist.watchlistStocks) {
        debugger
        stockSymbols.push(stock.symbol)
    }

    //get all stocks data from API call
    let fetchedData = [];
    const getStockData = async (symbol) => {
        let res = await fetch(`/api/finnhub/stock-data/${symbol}`);
        let data = await res.json();
        data["name"] = symbol;
        fetchedData.push(data);
    };
    for (let symbol of stockSymbols) {
        getStockData(symbol);
    }
    console.log(fetchedData)

    return (
        <>
            <DashboardNav />
            <div className="watchlist-container">
                <div className="watchlist-scrolllist">

                    <div>
                        <img className="watchlist-lightning-logo" alt="⚡" src="https://cdn.robinhood.com/emoji/v0/128/26a1.png"></img>
                    </div>

                    <div className="watchlist-scroll-title">
                        <div className="watchlist-scroll-listname">
                            {watchlist.name}
                        </div>
                        <div className="watchlist-scroll-ellipsisicon">
                            <button className="watchlist-button">...</button>
                        </div>


                    </div>

                    <div className="watchlist-itemnum"> {watchlist.watchlistStocks.length} items</div>
                    {/* <div className="market-news-container">
                        {wlStocks.length > 0 &&
                            wlStocks.map((article) => (
                                // <NewsArticle
                                //     key={article.id}
                                //     headline={article.headline}
                                //     image={article.image}
                                //     summary={article.summary}
                                //     url={article.url}
                                //     source={article.source}
                                // />
                            ))}
                    </div> */}
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
                                {/* <WatchlistStockCard
                                    name={stock.name}
                                    headline={article.headline}
                                    image={article.image}
                                    summary={article.summary}
                                    url={article.url}
                                    source={article.source}
                                /> */}
                                <tr>
                                    <td >Gamestop</td>
                                    <td>{stockSymbols[0]}</td>
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

                    <div className="watchlist-sticky-title">
                        <div className="watchlist-sticky-list">
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
                        <div className="watchlist-hide">
                            ...
                        </div>

                    </div>

                </div>

            </div >
        </>

    )
}

export default WatchListPage