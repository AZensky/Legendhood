import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DashboardNav from "../DashboardNavbar";
import WatchlistStockCard from "./WatchlistStockCard";
import { getOneWatchlist } from "../../store/watchlist";
import "./WatchListPage.css";

function WatchListPage() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)
    // const [watchlist, setWatchlist] = useState({})
    const [watchlistStocks, setWatchlistStocks] = useState([])

    const { watchlistId } = useParams();

    const watchlist = useSelector((state) => state.watchlist);
    console.log('123:watchlist', watchlist)

    // let watchlist = useSelector(state => {
    //     return state.group && state.group.length === 1 && state.group[0]
    // })
    useEffect(() => {
        if (!watchlistId) {
            return;
        }
        dispatch(getOneWatchlist(watchlistId));

        // (async () => {
        //     const response = await fetch(`/api/watchlist/${watchlistId}`);
        //     const watchlist = await response.json();
        //     setWatchlist(watchlist);
        // })();

        setIsLoaded(true)

    }, [dispatch, watchlistId]);

    if (!watchlist) {
        return null;
    }

    return isLoaded && (
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

                    <div className="watchlist-itemnum">5 items</div>
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
                                {/* <tr>
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
                                </tr> */}


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