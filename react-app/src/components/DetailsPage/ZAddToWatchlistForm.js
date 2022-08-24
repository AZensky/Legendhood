import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { authenticate } from "../../store/session";
import { loadWatchlists } from "../../store/watchlist";

function ZAddToWatchlistForm() {

    let { symbol } = useParams()
    symbol = symbol.toUpperCase()

    const [isLoaded2, setIsLoaded2] = useState(false)
    const [originalState, setOriginalState] = useState({})
    const [newState, setNewState] = useState({})
    const dispatch = useDispatch()
    let user = useSelector(state => state.session.user)
    const [watchlist, setWatchList] = useState([])

    useEffect(() => {

        const initializeForm = async () => {
            const res = await fetch("/api/watchlists")
            const data = await res.json()

            let userwatchlist = data.watchlists
            const origState = {}
            userwatchlist.forEach((list) => {
                let check = false
                for (let item of list.watchlistStocks) {
                    console.log(item["symbol"] === symbol)
                    if (item["symbol"] === symbol) check = true
                }
                origState[list.id] = check
            })
            console.log("ORIGINAL STATE",origState)
            setOriginalState(origState)
            setNewState(origState)
            setWatchList(userwatchlist)
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
        let changed = {...newState}
        changed[id] = !changed[id]
        setNewState(changed)
    }

    return isLoaded2 && (
        <div>
            <form

            >
                {watchlist.length > 0 && watchlist.map((lst) => {
                    console.log(lst.name,",",lst.id, ",", newState[lst.id])
                    return (
                        <div key={lst.id} className="add-to-watchlst-form">
                            <input
                                type="checkbox"
                                onChange={() => handleChange(lst.id)}
                                checked={newState[lst.id]}
                            ></input>
                            <div>
                                logo
                            </div>
                            <div>
                                {lst.name}
                            </div>
                        </div>
                    )
                })}
            </form>
        </div>
    );
}

export default ZAddToWatchlistForm;
