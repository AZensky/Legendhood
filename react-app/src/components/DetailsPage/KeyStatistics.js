import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStockDetails } from "../../util/stocks-api";
import NewsArticle from "../NewsArticle";

function KeyStatistics({ details, quote }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [assetDetails, setAssetDetails] = useState(details)
    const [assetQuote, setAssetQuote] = useState( quote)

    useEffect(() => {
        setIsLoaded(true)
    }, [])


    return isLoaded && (
        <>
            <div className="details-page-about-key-statistic">
                <div>
                    Market cap
                </div>
                <div>
                    {assetDetails["MarketCapitalization"]}
                </div>
            </div>
            <div className="details-page-about-key-statistic">
                <div>
                    Price earnings ratio
                </div>
                <div>
                    {assetDetails["PERatio"]}
                </div>
            </div>
            <div className="details-page-about-key-statistic">
                <div>
                    Dividend yield
                </div>
                <div>
                    {assetDetails["DividendYield"]}
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
                <div>
                    High today
                </div>
                <div>
                    {assetQuote.h}
                </div>
            </div>
            <div className="details-page-about-key-statistic">
                <div>
                    Low today
                </div>
                <div>
                    {assetQuote.l }
                </div>
            </div>
            <div className="details-page-about-key-statistic">
                <div>
                    Open price
                </div>
                <div>
                    { assetQuote.o}
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
                <div>
                    52 week high
                </div>
                <div>
                    {assetDetails["52WeekHigh"]}
                </div>
            </div>
            <div className="details-page-about-key-statistic">
                <div>
                    52 week low
                </div>
                <div>
                    {assetDetails["52WeekLow"]}
                </div>
            </div>
        </>
    );
}

export default KeyStatistics;
