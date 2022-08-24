import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetailsPage.css"

function AddToWatchListForm() {
    const { symbol } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [lists, setLists] = useState([])

    useEffect(() => {
        // get all lists as an array
        setLists([
            {
                id: 1,
                name: "test list 1",
                watchlist_stocks: [
                    {
                        id: 1,
                        symbol: "TEST",
                        name: "test1"
                    },
                    {
                        id: 1,
                        symbol: "TST",
                        name: "test2"
                    },
                    {
                        id: 1,
                        symbol: "TEEST",
                        name: "Test 3"
                    },
                ]
            },
            {
                id: 1,
                name: "test list 2",
                watchlist_stocks: [
                    {
                        id: 1,
                        symbol: "IBM",
                        name: "test1"
                    },
                ]
            }
        ])


        setIsLoaded(true)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

    }


    return isLoaded && (
        <div className="details-page-watchlist-form">
            <form
                onSubmit={handleSubmit}
                className="details-page-watch-list-form"
            >
                {lists.length > 0 && (
                    lists.map((list, i) => {


                        return (
                            <label

                            >
                                <input
                                    type="checkbox"
                                    className="details-page-watchlist-form-listitem"
                                >
                                </input>
                                <div className="details-page-watchlist-form-list-logo">LOGO</div>
                                <div className="details-page-watchlist-form-list-name">{list.name}</div>
                            </label>
                        )
                    })
                )}
                <button className="details-page-watch-list-button">Save Changes</button>
            </form>
        </div>
    );
}

export default AddToWatchListForm;
