import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function KeyStatistics({ details, quote }) {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {

        setIsLoaded(true)
    }, [])

    function convertNum(inputNum) {
        let num = Number(inputNum.toString().split(".")[0])
        const lng = num.toString().length

        const denominator = ["", "K", "M", "B", "t", "q", "Q", "s", "S", "o", "n", "d", "U", "D", "T"]

        const denomCheck = Math.floor((lng - 1) / 3)
        let newnum;
        let decimals;

        if (Number(num.toString()[lng - (1 + 3 * (denomCheck - 1))]) >= 5) {
            const roundedUp = Number(num.toString().slice(0, lng - (1 + 3 * (denomCheck - 1)))) + 1
            newnum = roundedUp.toString().slice(0, lng - 3 * denomCheck)
            decimals = roundedUp.toString().slice(lng - 3 * denomCheck, lng - (1 + 3 * (denomCheck - 1)))
        } else {
            newnum = num.toString().slice(0, lng - 3 * denomCheck)
            decimals = num.toString().slice(lng - 3 * denomCheck, lng - (1 + 3 * (denomCheck - 1)))
        }

        return `$${newnum}${lng >= 4 ? "." : ""}${decimals}${denominator[Math.floor((lng - 1) / 3)]}`
    }

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
                    ${quote.l}
                </div>
            </div>
            <div className="details-page-about-key-statistic">
                <div className="details-page-about-key-statistic-item header">
                    Open price
                </div>
                <div className="details-page-about-key-statistic-item value">
                    ${quote.o}
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
