import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { authenticate } from "../../store/session";
import { createOneStock, deleteOneStockFromDetailsPage, loadWatchlists, createOneWatchlist } from "../../store/watchlist";


function ZAddToWatchlistForm({ setShowModal, amountChanged }) {

    let { symbol } = useParams()
    symbol = symbol.toUpperCase()

    const [isLoaded2, setIsLoaded2] = useState(false)
    const [originalState, setOriginalState] = useState({})
    const [newState, setNewState] = useState({})
    const [listCounts, setListCounts] = useState({})
    const dispatch = useDispatch()
    let user = useSelector(state => state.session.user)
    const [watchlist, setWatchList] = useState([])
    const [changesMade, setChangesMade] = useState(false)
    const [saveChanges, setSaveChanges] = useState(false)
    const [isShown, setIsShown] = useState(false)
    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])

    const initializeForm = async () => {
        const res = await fetch("/api/watchlists")
        const data = await res.json()

        let userwatchlist = data.watchlists
        const origState = {}
        const listLengths = {}
        userwatchlist.forEach((list) => {
            let check = false
            for (let item of list.watchlistStocks) {
                if (item["symbol"] === symbol) check = true
            }
            origState[list.id] = check
            listLengths[list.id] = list.watchlistStocks.length
        })
        setOriginalState(origState)
        setNewState(origState)
        setWatchList(userwatchlist)
        setListCounts(listLengths)
        setIsLoaded2(true)
    }

    useEffect(() => {
        initializeForm()

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let changed = false
        for (let listId in originalState) {
            if (originalState[listId] !== newState[listId]) {
                const action = newState[listId] ? "POST" : "DELETE"

                if (action === "DELETE") {
                    await dispatch(deleteOneStockFromDetailsPage(listId, symbol))
                } else if (action === "POST") {
                    const payload = {
                        "symbol": symbol,
                        "watchlist_id": listId
                    }
                    await dispatch(createOneStock(payload))
                }
                changed = true
            }
        }

        if (changed) {
            setChangesMade(changed)
            initializeForm()
            setShowModal(false)
        }
        await dispatch(authenticate())
    }

    useEffect(() => {
        let changed = false
        for (let listId in originalState) {
            if (originalState[listId] !== newState[listId]) {
                changed = true
            }
        }
        setSaveChanges(changed)
    }, [newState])

    const handleChange = (id) => {
        let changed = { ...newState }
        changed[id] = !changed[id]
        setNewState(changed)
        setChangesMade(false)
    }

    const handleNewListSubmit = async (e) => {
        e.preventDefault();

        if (name.length < 15) {
            await dispatch(createOneWatchlist({ name }))
            initializeForm()
            setIsShown(false)
        } else {
            setErrors(["Watchlist's name must be 15 characters or less."]);
        }
    };

    return isLoaded2 && (
        <>
            <div className="add-to-watchlst-form-list-container">
                <div className="add-to-watchlst-form-title-container">
                    <div className="add-to-watchlst-form-title">{`Add ${symbol} to Your Lists`}</div>
                    <div className="add-to-watchlst-form-x" onClick={() => setShowModal(false)}><i className="fa-solid fa-xmark"></i></div>
                </div>
                {/* <div style={{visibility: `${changesMade? "visible" : "hidden"}`}}>
                Your lists have been updated
            </div> */}
                {!isShown && (
                    <div onClick={() => setIsShown(true)} className="add-to-watchlst-form-list create">
                        <input
                            className={`add-to-watchlst-form-list-checkbox ${amountChanged < 0 ? "red" : "green"}`}
                            type="checkbox"
                            style={{ visibility: "hidden" }}
                        ></input>
                        <div className={`add-to-watchlst-form-logo-container plus ${amountChanged < 0 ? "red" : "green"}`}>
                            <i class="fa-solid fa-plus"></i>
                        </div>
                        <div className="add-to-watchlst-form-list-name">
                            Create New List
                        </div>
                    </div>
                )}
                {isShown && (
                    <div className="dashboard-watchlist-createlist-dropdown">
                        <div className="dashboard-watchlist-createlist-dropdown-row">
                            <form
                                onSubmit={handleNewListSubmit}
                                className="dashboard-watchlist-form"
                            >
                                <div className="watchlist-createlist-dropdown-content">
                                    <img
                                        className="dashboard-watchlist-lightning-logo-3"
                                        alt="⚡"
                                        src="https://cdn.robinhood.com/emoji/v0/128/26a1.png"
                                    ></img>
                                    <input
                                        className="dashboard-watchlist-createlist-input"
                                        type="text"
                                        placeholder="List Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="watchlist-createlist-dropdown-row">
                                    <div className="dashboard-watchlist-btn-container">
                                        <button
                                            type="button"
                                            className={`watchlist-cancel-button ${amountChanged < 0 ? "red" : "green"}`}
                                            onClick={() => setIsShown(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    <div className="dashboard-watchlist-btn-container">
                                        <button
                                            type="submit"
                                            className={`watchlist-confirm-button ${amountChanged < 0 ? "red" : "green"}`}
                                        >
                                            Create List
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="watchlist-create-errors">
                            {errors.length > 0 && (
                                <ul>
                                    {errors.map((error) => (
                                        <li>{error}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
                <form
                    onSubmit={handleSubmit}
                    className="add-to-watchlst-form"
                >
                    {watchlist.length > 0 && watchlist.map((lst) => {
                        return (
                            <div key={lst.id} className="add-to-watchlst-form-list">
                                <input
                                    className={`add-to-watchlst-form-list-checkbox ${amountChanged < 0 ? "red" : "green"}`}
                                    type="checkbox"
                                    onChange={() => handleChange(lst.id)}
                                    checked={newState[lst.id]}
                                ></input>
                                <div className="add-to-watchlst-form-logo-container">
                                    <img className="add-to-watchlst-form-logo"
                                        alt="⚡"
                                        src="https://cdn.robinhood.com/emoji/v0/128/26a1.png"
                                    ></img>
                                </div>
                                <div className="add-to-watchlst-form-list-name">
                                    <div className="add-to-watchlst-form-list-name title">
                                        {lst.name}
                                    </div>
                                    <div className="add-to-watchlst-form-list-name items">
                                        {`${listCounts[lst.id]} ${listCounts[lst.id] === 1 ? "item" : "items"}`}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </form>
                <div
                    className="add-to-watchlst-form-button-container"
                >
                    <button
                        onClick={handleSubmit}
                        className={`add-to-watchlst-form-save-changes-button ${amountChanged < 0 ? "red" : "green"} ${saveChanges ? "enabled" : "disabled"}`}
                        disabled={!saveChanges}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    );
}

export default ZAddToWatchlistForm;
