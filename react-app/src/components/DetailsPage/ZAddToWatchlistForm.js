import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { authenticate } from "../../store/session";
import { loadWatchlists } from "../../store/watchlist";


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

    useEffect(() => {

        const initializeForm = async () => {
            const res = await fetch("/api/watchlists")
            const data = await res.json()

            let userwatchlist = data.watchlists
            const origState = {}
            const listLengths = {}
            userwatchlist.forEach((list) => {
                let check = false
                for (let item of list.watchlistStocks) {
                    console.log(item["symbol"] === symbol)
                    if (item["symbol"] === symbol) check = true
                }
                origState[list.id] = check
                listLengths[list.id] = list.watchlistStocks.length
            })
            console.log("ORIGINAL STATE", origState)
            setOriginalState(origState)
            setNewState(origState)
            setWatchList(userwatchlist)
            setListCounts(listLengths)
            setIsLoaded2(true)
        }

        initializeForm()

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        await dispatch(authenticate())
    }

    useEffect(() => {
        console.log(originalState)
        console.log(newState)
    }, [newState])

    const handleChange = (id) => {
        let changed = { ...newState }
        changed[id] = !changed[id]
        setNewState(changed)
    }

    return isLoaded2 && (
        <div className="add-to-watchlst-form-list-container">
            <div className="add-to-watchlst-form-title-container">
                <div className="add-to-watchlst-form-title">{`Add ${symbol} to Your Lists`}</div>
                <div className="add-to-watchlst-form-x" onClick={() => setShowModal(false)}><i className="fa-solid fa-xmark"></i></div>
            </div>
            <form
                onSubmit={handleSubmit}
                className="add-to-watchlst-form"
            >
                {watchlist.length > 0 && watchlist.map((lst) => {
                    console.log(lst.name, ",", lst.id, ",", newState[lst.id])
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
                    <button className={`add-to-watchlst-form-save-changes-button ${amountChanged < 0 ? "red" : "green"}`}>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ZAddToWatchlistForm;
