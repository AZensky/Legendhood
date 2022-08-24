import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { authenticate } from "../../store/session";
import { createOneStock, deleteOneStockFromDetailsPage, loadWatchlists } from "../../store/watchlist";


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
                console.log("Action:", action)
                if (action === "DELETE") {
                    await dispatch(deleteOneStockFromDetailsPage(listId, symbol))
                } else if (action === "POST") {
                    console.log("POSTING")
                    const payload = {
                        "symbol": symbol,
                        "watchlist_id": listId
                    }
                    await dispatch(createOneStock(payload))
                }
                changed = true
            }
        }

        if(changed) {
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

    return isLoaded2 && (
        <div className="add-to-watchlst-form-list-container">
            <div className="add-to-watchlst-form-title-container">
                <div className="add-to-watchlst-form-title">{`Add ${symbol} to Your Lists`}</div>
                <div className="add-to-watchlst-form-x" onClick={() => setShowModal(false)}><i className="fa-solid fa-xmark"></i></div>
            </div>
            {/* <div style={{visibility: `${changesMade? "visible" : "hidden"}`}}>
                Your lists have been updated
            </div> */}
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
                <div
                    className="add-to-watchlst-form-button-container"
                >
                    <button
                        className={`add-to-watchlst-form-save-changes-button ${amountChanged < 0 ? "red" : "green"} ${saveChanges? "enabled":"disabled"}`}
                        disabled={!saveChanges}
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ZAddToWatchlistForm;
