import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { clearCurrentWatchlist, getWatchlist, loadWatchlists } from "../../store/watchlist";
import DashboardNav from "../DashboardNavbar";
import LoadingSpinner from "../LoadingSpinner";
// import WatchlistStockCard from "./WatchlistStockCard";
import "./WatchListPage.css";

function WatchListPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    //fucntions
    const getPercentChangeCell = (change) => {
        return <>{getArrow(change)} {Math.round(Math.abs(change) * 100) / 100}%</>
    }

    const getPercentOnly = (change) => {
        return <>{Math.round(Math.abs(change) * 100) / 100}</>
    }

    const getArrow = (change) => {
        if (change < 0) {
            return <span style={{ color: "red" }}>▼</span>
        } else {
            return <span style={{ color: "green" }}>▲</span>
        }
    }

    function convertNum(inputNum) {
        let num = Number(inputNum.toString().split(".")[0]) * 1000000
        const lng = num.toString().length

        const denominator = ["", "K", "M", "B", "T", "q", "Q", "s", "S", "o", "n", "d", "U", "D", "t"]


        const denomCheck = Math.floor((lng - 1) / 3)
        let newnum;
        let decimals;

        if (Number(num.toString()[lng - (1 + 3 * (denomCheck - 1))]) >= 5) {
            const roundedUp = Number(num.toString().slice(0, lng - (1 + 3 * (denomCheck - 1)))) + 1
            newnum = roundedUp.toString().slice(0, lng - 3 * denomCheck)
            decimals = roundedUp.toString().slice(lng - 3 * denomCheck, lng - (1 + 3 * (denomCheck - 1)))
        } else {
            newnum = num.toString().slice(0, lng - 3 * denomCheck)
            decimals = num.toString().slice(lng - 3 * denomCheck, lng - (1 + 3 * (denomCheck - 1)))
        }

        return `$${newnum}${lng >= 4 ? "." : ""}${decimals}${denominator[Math.floor((lng - 1) / 3)]}`
    }

    //get watchlist by id
    const { watchlistId } = useParams();

    useEffect(() => {
        dispatch(getWatchlist(watchlistId))
        dispatch(loadWatchlists())

        return () => {
            dispatch(clearCurrentWatchlist())
        }
    }, [dispatch, watchlistId]);

    //set backend returned data into variable
    const watchlist = useSelector((state) => {
        const currentWatchlist = state.watchlist.currentWatchlist;

        return String(currentWatchlist?.id) === watchlistId ? currentWatchlist : null;
    })

    const watchlists = useSelector(state => {
        return state.watchlist.watchlists;
    })

    //render component
    if (!watchlist) {
        return <></>;
    }

    //onClick fucntions
    function ClickStock(e) {
        const stocksym = e.currentTarget.id;
        history.push(`/stocks/${stocksym}`)

    }

    function ClickList(e) {
        const listId = e.currentTarget.id;
        history.push(`/watchlists/${listId}`)

    }

    function deleteStock(e) {
        const stocksym = e.currentTarget.id;
        dispatch(watchlistId, stocksym)
    }

    //get all stocks symbols in the watchlist
    // const stockSymbols = []
    // for (let stock of watchlist.watchlistStocks) {
    //     stockSymbols.push(stock.symbol)
    // }

    return (
        <>
            <DashboardNav />
            {isLoaded ? (<div className="watchlist-container">
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
                    {/* <div className="watchlist-table-1">
                        <header>
                            <div>Name</div>
                            <div>Symbol</div>
                            <div>Price</div>
                            <div>Today</div>
                            <div>Market Cap</div>
                            <div></div>
                        </header>
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {watchlist.watchlistStocks.map((stock) =>
                                    <tr id={stock.symbol} onClick={ClickStock}>
                                        <td>{stock.name}</td>
                                        <td >{stock.symbol}</td>
                                        <td>${getPercentOnly(stock.currentPrice)}</td>
                                        <td>{getPercentChangeCell(stock.percentChange)}</td>
                                        <td>{convertNum(stock.marketCap)}</td>
                                        <td>
                                            <button id={stock.symbol} className="watchlist-button" onClick={deleteStock}>x</button>
                                        </td>
                                    </tr>
                                )}
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

                    {watchlists.map((list) =>
                        <>
                            <div id={list.id} onClick={ClickList} className="watchlist-list-card">
                                <div>
                                    <img className="watchlist-lightning-logo-2" alt="⚡" src="https://cdn.robinhood.com/emoji/v0/128/26a1.png"></img>
                                </div>
                                <div className="watchlist-list-name">
                                    {list.name}
                                </div>
                                <div className="watchlist-hide">
                                    ...
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div >) : (
                <LoadingSpinner />
            )}
        </>
    )
}


export default WatchListPage