import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { convertNum } from "../../util/stocks-api";

function KeyStatistics({ details, quote }) {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {

        setIsLoaded(true)
    }, [])

    return isLoaded && (
        <>
            <div className="details-page-about-key-statistic">
                <div className="details-page-about-key-statistic-item header">
                    Market cap
                </div>
                <div className="details-page-about-key-statistic-item value">
                    {convertNum(details["MarketCapitalization"])}
                </div>
            </div>
            <div className="details-page-about-key-statistic">
                <div className="details-page-about-key-statistic-item header">
                    Price earnings ratio
                </div>
                <div className="details-page-about-key-statistic-item value">
                    {details["PERatio"]}
                </div>
            </div>
            <div className="details-page-about-key-statistic">
                <div className="details-page-about-key-statistic-item header">
                    Dividend yield
                </div>
                <div className="details-page-about-key-statistic-item value">
                    {details["DividendYield"]}
                </div>
            </div>
            {/* <div className="details-page-about-key-statistic">
                <div>
                    Average volume
                </div>
                <div>
                    { }
                </div>
            </div> */}
            <div className="details-page-about-key-statistic">
                <div className="details-page-about-key-statistic-item header">
                    High today
                </div>
                <div className="details-page-about-key-statistic-item value">
                    ${quote.h}
                </div>
            </div>
            <div className="details-page-about-key-statistic">
                <div className="details-page-about-key-statistic-item header">
                    Low today
                </div>
                <div className="details-page-about-key-statistic-item value">
                    ${quote.l }
                </div>
            </div>
            <div className="details-page-about-key-statistic">
                <div className="details-page-about-key-statistic-item header">
                    Open price
                </div>
                <div className="details-page-about-key-statistic-item value">
                    ${ quote.o}
                </div>
            </div>
            {/* <div className="details-page-about-key-statistic">
                <div>
                    Volume
                </div>
                <div>
                    { }
                </div>
            </div> */}
            <div className="details-page-about-key-statistic">
                <div className="details-page-about-key-statistic-item header">
                    52 week high
                </div>
                <div className="details-page-about-key-statistic-item value">
                    ${details["52WeekHigh"]}
                </div>
            </div>
            <div className="details-page-about-key-statistic">
                <div className="details-page-about-key-statistic-item header">
                    52 week low
                </div>
                <div className="details-page-about-key-statistic-item value">
                    ${details["52WeekLow"]}
                </div>
            </div>
        </>
    );
}

export default KeyStatistics;
