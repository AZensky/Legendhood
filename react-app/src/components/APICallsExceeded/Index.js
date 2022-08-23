import React from "react";
import { useHistory } from "react-router-dom";
import "./APICallsExceeded.css";

function APICallsExceeded({ symbol, reset }) {
    const history = useHistory();

    const noSymbol = symbol? false : true;

    return (
        <div className="api-calls-exceeded-main-container">
            <div className="api-calls-exceeded-container-left">
                <h1>API CALLS EXCEEDED</h1>
                <p>
                    We apologize for the inconvenience. It seems that you have exceeded the allowable number of calls to alphavantage, which provides most of the information available on the stocks details page. Please wait a minute and try again usinng the button below, or youcan head back to your dashboard.
                </p>
                {noSymbol && (<p>
                    Don't try to hide it. you came directly to this page... Since that's the case, the below button will take you straight to
                </p>)}
                {!noSymbol && (<div className="api-calls-exceeded-buttons-div">
                    <button
                        className="details-page-buy-sell-stock button green API"
                        onClick={() => reset(false)}
                    >
                        {`Return to ${symbol}`}
                    </button>
                    <button
                        className="details-page-buy-sell-stock button green API"
                        onClick={() => history.push(`/`)}
                    >
                        Return to dashboard
                    </button>
                </div>)}
                {noSymbol && (<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                    <button
                        className="details-page-buy-sell-stock button"
                    >
                        Return to dashboard
                    </button>
                </a>)}
            </div>
            <div className="api-calls-exceeded-container-right">
            </div>
        </div>
    );
}

export default APICallsExceeded;
