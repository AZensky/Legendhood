import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import DashboardNav from "../DashboardNavbar";
import LoadingSpinner from "../LoadingSpinner";
import Footer from "../Footer";
import WatchListDropdown from "./WatchListDropdown";
import "./WatchListPage.css";
import {
    clearCurrentWatchlist,
    getWatchlist,
    loadWatchlists,
    createOneWatchlist,
    editOneWatchlist,
    deleteOneStock,
} from "../../store/watchlist";

function WatchListPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [showEdit, setShowEdit] = useState(false)
    const [name, setName] = useState("");

    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => { setShowMenu(false); };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    //get watchlist by id
    const { watchlistId } = useParams();

    useEffect(() => {
        setIsLoaded(false)
        const intializeWatchlistPage = async () => {
            await dispatch(getWatchlist(watchlistId));
            await dispatch(loadWatchlists());
            setIsLoaded(true);
        };
        intializeWatchlistPage();

        return () => {
            dispatch(clearCurrentWatchlist());
        };
    }, [dispatch, watchlistId]);

    //set backend returned data into variable
    const watchlist = useSelector((state) => {
        const currentWatchlist = state.watchlist.currentWatchlist;
        return String(currentWatchlist?.id) === watchlistId
            ? currentWatchlist
            : null;
    });

    const watchlists = useSelector((state) => {
        return state.watchlist.watchlists;
    });

    //onClick fucntions
    function clickStock(e) {
        const stocksym = e.currentTarget.parentElement.id;
        history.push(`/stocks/${stocksym}`);
    }

    function clickList(e) {
        const listId = e.currentTarget.id;
        history.push(`/watchlists/${listId}`);
    }
    function listnameClick() {
        setShowEdit(true)
    }
    function showCreateList() {
        // dispatch
        setIsShown((current) => !current);
    }

    function clickCancel() {
        setIsShown(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createOneWatchlist({ name })).then((watchlist) =>
            history.push(`/watchlists/${watchlist?.id}`)
        );
        setIsShown(false);
    };

    const handleEditSubmit = async (name) => {
        await dispatch(editOneWatchlist(watchlistId, { name }));
        dispatch(loadWatchlists());
        setShowEdit(false)
    };

    const deleteStock = async (e) => {
        const stocksym = e.currentTarget.id;
        await dispatch(deleteOneStock(watchlistId, stocksym)).then(() =>
            history.push(`/watchlists/${watchlistId}`)
        );
    }

    return (
        <>
            <DashboardNav />
            {isLoaded ? (
                <div className="watchlist-container">
                    <div className="watchlist-scrolllist">
                        <div>
                            <img
                                className="watchlist-lightning-logo"
                                alt="⚡"
                                src="https://cdn.robinhood.com/emoji/v0/128/26a1.png"
                            ></img>
                        </div>

                        <div className="watchlist-scroll-title">
                            {(!showEdit) && (
                                <div className={"watchlist-scroll-listname"} onClick={listnameClick}>
                                    {watchlist?.name}
                                </div>
                            )}
                            {showEdit && (
                                <div>
                                    <input
                                        className={"watchlist-scroll-listname"}
                                        type="text"
                                        autoFocus
                                        defaultValue={watchlist?.name}
                                        onBlur={(e) => {
                                            handleEditSubmit(e.target.value)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleEditSubmit(e.target.value)
                                            }
                                        }}
                                        required
                                    ></input>
                                </div>
                            )}
                            <div className="watchlist-scroll-ellipsisicon">
                                <WatchListDropdown
                                    watchlistName={watchlist?.name}
                                    watchlist_Id={watchlistId}
                                />
                            </div>
                        </div>

                        <div className="watchlist-itemnum">
                            {" "}
                            {watchlist?.watchlistStocks?.length} items
                        </div>
                        <div className="watchlist-table">
                            <header className="watchlist-row">
                                <div>Name</div>
                                <div>Symbol</div>
                                <div>Price</div>
                                <div>Today</div>
                                <div>Market Cap</div>
                                <div></div>
                            </header>
                            {watchlist?.watchlistStocks.map((stock) => (
                                <div id={stock.symbol} className="watchlist-row">
                                    <div onClick={clickStock}>{stock.name}</div>
                                    <div onClick={clickStock}>{stock.symbol}</div>
                                    <div onClick={clickStock}>
                                        ${getPercentOnly(stock.currentPrice)}
                                    </div>
                                    <div onClick={clickStock}>
                                        {getPercentChangeCell(stock.percentChange)}
                                    </div>
                                    <div onClick={clickStock}>{convertNum(stock.marketCap)}</div>
                                    <div>
                                        <button
                                            id={stock.symbol}
                                            className="watchlist-button"
                                            onClick={deleteStock}
                                        >
                                            <i class="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="watchlist-stickylist">
                        <div className="watchlist-sticky-title">
                            <div className="watchlist-sticky-list">Lists</div>
                            <div className="watchlis-sticky-plus-sign">
                                <button className="watchlist-button" onClick={showCreateList}>
                                    +
                                </button>
                            </div>
                        </div>

                        {isShown && (
                            <div className="watchlist-createlist-dropdown">
                                <div className="watchlist-createlist-dropdown-row">
                                    <form onSubmit={handleSubmit}>
                                        <div className="watchlist-createlist-dropdown-content">
                                            <img
                                                className="watchlist-lightning-logo-3"
                                                alt="⚡"
                                                src="https://cdn.robinhood.com/emoji/v0/128/26a1.png"
                                            ></img>
                                            <input
                                                className="watchlist-createlist-input"
                                                type="text"
                                                placeholder="List Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="watchlist-createlist-dropdown-row">
                                            <div>
                                                <button
                                                    type="button"
                                                    className="watchlist-cancel-button"
                                                    onClick={clickCancel}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    type="submit"
                                                    className="watchlist-confirm-button"
                                                >
                                                    Create List
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {watchlists.map((list) => (
                            <>
                                <div
                                    id={list.id}
                                    onClick={clickList}
                                    className="watchlist-list-card"
                                >
                                    <div>
                                        <img
                                            className="watchlist-lightning-logo-2"
                                            alt="⚡"
                                            src="https://cdn.robinhood.com/emoji/v0/128/26a1.png"
                                        ></img>
                                    </div>
                                    <div className="watchlist-list-name">{list.name}</div>
                                    <div className="watchlist-hide">...</div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            ) : (
                <LoadingSpinner />
            )
            }

            {isLoaded && <Footer />}
        </>
    );
}

function convertNum(inputNum) {
    let num = Number(inputNum.toString().split(".")[0]) * 1000000;
    const lng = num.toString().length;

    const denominator = [
        "",
        "K",
        "M",
        "B",
        "T",
        "q",
        "Q",
        "s",
        "S",
        "o",
        "n",
        "d",
        "U",
        "D",
        "t",
    ];

    const denomCheck = Math.floor((lng - 1) / 3);
    let newnum;
    let decimals;

    if (Number(num.toString()[lng - (1 + 3 * (denomCheck - 1))]) >= 5) {
        const roundedUp =
            Number(num.toString().slice(0, lng - (1 + 3 * (denomCheck - 1)))) + 1;
        newnum = roundedUp.toString().slice(0, lng - 3 * denomCheck);
        decimals = roundedUp
            .toString()
            .slice(lng - 3 * denomCheck, lng - (1 + 3 * (denomCheck - 1)));
    } else {
        newnum = num.toString().slice(0, lng - 3 * denomCheck);
        decimals = num
            .toString()
            .slice(lng - 3 * denomCheck, lng - (1 + 3 * (denomCheck - 1)));
    }

    return `$${newnum}${lng >= 4 ? "." : ""}${decimals}${denominator[Math.floor((lng - 1) / 3)]
        }`;
}

//fucntions
const getPercentChangeCell = (change) => {
    return (
        <>
            {getArrow(change)} {Math.round(Math.abs(change) * 100) / 100}%
        </>
    );
};

const getPercentOnly = (change) => {
    return <>{Math.round(Math.abs(change) * 100) / 100}</>;
};

const getArrow = (change) => {
    if (change < 0) {
        return <span style={{ color: "red" }}>▼</span>;
    } else {
        return <span style={{ color: "#00c805" }}>▲</span>;
    }
};

export default WatchListPage;
