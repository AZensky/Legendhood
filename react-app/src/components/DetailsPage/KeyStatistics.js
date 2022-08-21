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

    function convertNum(inputNum) {
        let num = Number(inputNum.toString().split(".")[0])
        const lng = num.toString().length

        const denominator = ["", "K", "M", "B", "t", "q", "Q", "s", "S", "o", "n", "d", "U", "D", "T"]

        const denomCheck = Math.floor((lng-1)/3)
        console.log(Math.floor((lng-1)/3))
        console.log(Number(num.toString().slice(0, lng - (1 + 3 * (denomCheck - 1)))) + 1)
        console.log(denominator[Math.floor((lng-1)/3)])
        let newnum;
        let decimals;

        if (Number(num.toString()[lng - (1 + 3 * (denomCheck - 1))]) >= 5) {
            const roundedUp = Number(num.toString().slice(0, lng - (1 + 3 * (denomCheck - 1)))) + 1
            newnum = roundedUp.toString().slice(0, lng - 3*denomCheck)
            decimals = roundedUp.toString().slice(lng - 3*denomCheck, lng - (1 + 3 * (denomCheck - 1)))
        } else {
            newnum = num.toString().slice(0, lng - 3*denomCheck)
            decimals = num.toString().slice(lng - 3*denomCheck, lng - (1 + 3 * (denomCheck - 1)))
        }

        return `$${newnum}${lng >= 4? ".":""}${decimals}${denominator[Math.floor((lng-1)/3)]}`
    }

    return isLoaded && (
        <>
            <div className="details-page-about-key-statistic">
                <div>
                    Market cap
                </div>
                <div>
                    {convertNum(assetDetails["MarketCapitalization"])}
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
                    ${assetQuote.h}
                </div>
            </div>
            <div className="details-page-about-key-statistic">
                <div>
                    Low today
                </div>
                <div>
                    ${assetQuote.l }
                </div>
            </div>
            <div className="details-page-about-key-statistic">
                <div>
                    Open price
                </div>
                <div>
                    ${ assetQuote.o}
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
                    ${assetDetails["52WeekHigh"]}
                </div>
            </div>
            <div className="details-page-about-key-statistic">
                <div>
                    52 week low
                </div>
                <div>
                    ${assetDetails["52WeekLow"]}
                </div>
            </div>
        </>
    );
}

export default KeyStatistics;
