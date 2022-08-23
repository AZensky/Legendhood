import React from "react";
import { useHistory } from "react-router-dom";
import "./PageNotFound.css";
import pagenotfound from "../../assets/pagenotfound.svg"

function PageNotFound() {
    const history = useHistory();

    return (
        <div className="page-not-found-main-container">
            <div className="page-not-found-container-left">
                <h2 className="page-not-found-h1">404 <br></br>Page not found</h2>
                <p className="page-not-found-text">
                    Not all those who wander are lost, but it seems you may have taken a wrong turn.
                </p>
                <div className="page-not-found-button-div">
                    <button
                        className="details-page-buy-sell-stock button green page-not-found"
                        onClick={() => history.push(`/`)}
                    >
                        Go Home
                    </button>
                </div>
            </div>
            <div className="page-not-found-container-right">
                <img src={pagenotfound} className="page-not-found-image"></img>
            </div>
        </div>
    );
}

export default PageNotFound;
