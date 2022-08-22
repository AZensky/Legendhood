import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardNav from "../DashboardNavbar";
import LineChart from "../LineChart";
import NewsArticle from "../NewsArticle";
import BuySellForm from "./BuySellForm";
import KeyStatistics from "./KeyStatistics";
import { unixToDate } from "../../util/stocks-api";
import ChartTimeLine from "../ChartTimeLine";
import { useDispatch, useSelector } from "react-redux";
import { getUserPortfolioThunk } from "../../store/portfolio";

function DetailsPage() {
    const { symbol } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [assetDetails, setAssetDetails] = useState()
    const [assetQuote, setAssetQuote] = useState()
    const [news, setNews] = useState()
    const [weekClosingPrices, setWeekClosingPrices] = useState([]);
    const [weekDateLabels, setWeekDateLabels] = useState([]);
    const [showLink, setShowLink] = useState(false);
    const [toggleShowMore, setToggleShowMore] = useState(false);
    const [ownedStocks, setOwnedStocks] = useState(0)

    const portfolio = useSelector(state => state.portfolio)
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {

        const getDetails = async (symbol) => {
            const res = await fetch(`/api/finnhub/company-data/${symbol}`);
            const data = await res.json();
            setAssetDetails(data)
            return data;
        }

        const getQuote = async (symbol) => {
            const res = await fetch(`/api/finnhub/stock-data/${symbol}`);
            const data = await res.json();
            setAssetQuote(data)
            return data;
        }

        const pastWeekClosingPrices = async (symbol) => {
            let res = await fetch(`/api/finnhub/candlestick-data/week/${symbol}`);
            let data = await res.json();
            let closingPrices = data.c;
            let datetimes = data.t;

            let datetimeLabels = [];

            datetimes.forEach((unixtime) => {
                let datetime = unixToDate(unixtime);
                datetimeLabels.push(datetime);
            });
            setWeekClosingPrices(closingPrices);
            setWeekDateLabels(datetimeLabels);
        };

        const getNews = async (symbol) => {
            let res = await fetch(`/api/finnhub/company/${symbol}/news`);
            let data = await res.json();
            let topNews = data.slice(0, 3);
            setNews(topNews);
        };

        setWeekClosingPrices([
            133.15,
            133.31,
            133.31,
            133.61,
            134.61,
            135.12,
            134.91,
            134.71,
            134.91,
            134.46,
            134.53,
            136.06,
            136.26,
            137.03,
            136.98,
            137.12,
            136.46,
            136.55,
            136.91,
            136.91,
            136.42,
            137.51,
            136.91,
            136.89,
            137.635,
            137.41,
            137.87,
            137.78,
            137.79,
            137.67,
            137.65,
            137.45,
            138.25,
            138.45,
            138.91,
            138.195,
            138.48,
            138.76,
            139.07,
            138.75,
            138.2,
            136.81,
            137.99,
            138.47,
            138.26,
            137.92,
            138.51,
            138.66,
            138.07,
            138.34,
            138.25,
            138.19,
            138.09,
            138.09
        ])

        const datetimes = [
            1660561200,
            1660564800,
            1660568400,
            1660572000,
            1660575600,
            1660579200,
            1660582800,
            1660586400,
            1660590000,
            1660593600,
            1660604400,
            1660654800,
            1660658400,
            1660662000,
            1660665600,
            1660669200,
            1660672800,
            1660676400,
            1660680000,
            1660683600,
            1660737600,
            1660741200,
            1660744800,
            1660748400,
            1660752000,
            1660755600,
            1660759200,
            1660762800,
            1660766400,
            1660770000,
            1660777200,
            1660824000,
            1660827600,
            1660831200,
            1660834800,
            1660838400,
            1660842000,
            1660845600,
            1660849200,
            1660852800,
            1660896000,
            1660903200,
            1660906800,
            1660914000,
            1660917600,
            1660921200,
            1660924800,
            1660928400,
            1660932000,
            1660935600,
            1660939200,
            1660942800,
            1660946400,
            1660950000
        ]

        setWeekDateLabels(datetimes.map((unixtime) => unixToDate(unixtime)));

        setAssetDetails({
            "Symbol": "IBM",
            "AssetType": "Common Stock",
            "Name": "International Business Machines",
            "Description": "International Business Machines Corporation (IBM) is an American multinational technology company headquartered in Armonk, New York, with operations in over 170 countries. The company began in 1911, founded in Endicott, New York, as the Computing-Tabulating-Recording Company (CTR) and was renamed International Business Machines in 1924. IBM is incorporated in New York. IBM produces and sells computer hardware, middleware and software, and provides hosting and consulting services in areas ranging from mainframe computers to nanotechnology. IBM is also a major research organization, holding the record for most annual U.S. patents generated by a business (as of 2020) for 28 consecutive years. Inventions by IBM include the automated teller machine (ATM), the floppy disk, the hard disk drive, the magnetic stripe card, the relational database, the SQL programming language, the UPC barcode, and dynamic random-access memory (DRAM). The IBM mainframe, exemplified by the System/360, was the dominant computing platform during the 1960s and 1970s.",
            "CIK": "51143",
            "Exchange": "NYSE",
            "Currency": "USD",
            "Country": "USA",
            "Sector": "TECHNOLOGY",
            "Industry": "COMPUTER & OFFICE EQUIPMENT",
            "Address": "1 NEW ORCHARD ROAD, ARMONK, NY, US",
            "FiscalYearEnd": "December",
            "LatestQuarter": "2022-06-30",
            "MarketCapitalization": "122401456000",
            "EBITDA": "12159000000",
            "PERatio": "22.43",
            "PEGRatio": "1.85",
            "BookValue": "21.49",
            "DividendPerShare": "6.58",
            "DividendYield": "0.0483",
            "EPS": "6.09",
            "RevenuePerShareTTM": "66.38",
            "ProfitMargin": "0.0936",
            "OperatingMarginTTM": "0.111",
            "ReturnOnAssetsTTM": "0.03",
            "ReturnOnEquityTTM": "0.271",
            "RevenueTTM": "59679998000",
            "GrossProfitTTM": "31486000000",
            "DilutedEPSTTM": "6.09",
            "QuarterlyEarningsGrowthYOY": "0.041",
            "QuarterlyRevenueGrowthYOY": "0.093",
            "AnalystTargetPrice": "143.18",
            "TrailingPE": "22.43",
            "ForwardPE": "14.66",
            "PriceToSalesRatioTTM": "2.051",
            "PriceToBookRatio": "6.35",
            "EVToRevenue": "2.834",
            "EVToEBITDA": "13.22",
            "Beta": "0.853",
            "52WeekHigh": "142.93",
            "52WeekLow": "110.45",
            "50DayMovingAverage": "135.74",
            "200DayMovingAverage": "130.65",
            "SharesOutstanding": "896320000",
            "DividendDate": "2022-09-10",
            "ExDividendDate": "2022-08-09"
        })

        setAssetQuote({
            "c": 137.79,
            "d": 1.23,
            "dp": 0.9007,
            "h": 138.415,
            "l": 136.3,
            "o": 136.46,
            "pc": 136.56,
            "t": 1660766402
        })

        setNews([
            {
                "category": "company",
                "datetime": 1660928340,
                "headline": "International Business Machines Corp. stock falls Friday, still outperforms market",
                "id": 115341624,
                "image": "https://images.mktw.net/im-220105/social",
                "related": "IBM",
                "source": "MarketWatch",
                "summary": "Shares of International Business Machines Corp. slid 0.50% to $138.37 Friday, on what proved to be an all-around grim trading session for the stock market,...",
                "url": "https://finnhub.io/api/news?id=d4e73cc4d47dc099429e9c6ba73c0cfc3fdaf099fe52f53131beaaeca3138d63"
            },
            {
                "category": "company",
                "datetime": 1660917301,
                "headline": "IBM Strengthens USTA Collaboration With 5-Year Renewal Deal",
                "id": 115332524,
                "image": "https://s.yimg.com/uu/api/res/1.2/VfeGNfbhgfKBKJVOS_iZZg--~B/aD00MDA7dz02MzU7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en/zacks.com/8883f76244ca04cd93e2422dc9b5c4c5",
                "related": "IBM",
                "source": "Yahoo",
                "summary": "IBM is renewing its partnership with the United States Tennis Association in a five-year deal.",
                "url": "https://finnhub.io/api/news?id=bdbc3775fa7d0927d4bb8e48e0aec83cd14a73b3350e8992c6678f259d096dd5"
            },
            {
                "category": "company",
                "datetime": 1660895114,
                "headline": "Rocket Software Experts to Lead More Than Twenty Thought Leadership Sessions at SHARE Columbus 2022",
                "id": 115301679,
                "image": "",
                "related": "IBM",
                "source": "Finnhub",
                "summary": "The company will be a silver sponsor of the event with our top experts standing by at booth #402.Rocket Software, a global technology leader that develops enterprise software for some of the world's... | August 19, 2022",
                "url": "https://finnhub.io/api/news?id=f4e146430bc36739346311f17fbe4ccc7b456a6a0a334cc09b9e60882614c2ab"
            }])

        // const prepDetailsPage = async () => {
        //     await getNews(symbol)
        //     await getDetails(symbol)
        //     await getQuote(symbol)
        //     await pastWeekClosingPrices(symbol)
        //     setIsLoaded(true)
        // }
        // prepDetailsPage()

        setIsLoaded(true)
    }, [])

    return isLoaded && (
        <>
            <DashboardNav />
            <div className="details-page-main-container">
                <div className="details-page-left-container">
                    <div className="details-page-title-and-price">
                        <h1 className="details-page-title">{assetDetails.Name}</h1>
                        <div className="details-page-price">
                            ${assetQuote.c}
                        </div>
                        <div className={`details-page-delta ${assetQuote.d < 0 ? "red" : "green"}`}>
                            {assetQuote.d < 0 ? "-" : "+"}${assetQuote.d} {`(${assetQuote.d < 0 ? "-" : "+"}${assetQuote.dp}%)`}
                        </div>
                    </div>
                    <div className="details-page-graph-container">
                        <LineChart labels={weekDateLabels} prices={weekClosingPrices} />
                    </div>
                    <div className="details-page-graph-timeline">
                        <ChartTimeLine />
                    </div>
                    <div className="details-page-about narrow">
                        <div className="details-page-about-header">About</div>
                        <p className="details-page-about-details">
                            {assetDetails.Description}
                        </p>
                        {showLink && (
                            <div
                                onClick={() => setToggleShowMore(!toggleShowMore)}
                            >
                                {toggleShowMore? "show more": "show less"}
                            </div>
                        )}
                        {/* <div className="details-page-about-tidbits-container">
                        <div className="details-page-about-tidbit">
                            <div>
                                CEO
                            </div>
                            <div>
                                { }
                            </div>
                        </div>
                        <div className="details-page-about-tidbit">
                            <div>
                                Employees
                            </div>
                            <div>
                                { }
                            </div>
                        </div>
                        <div className="details-page-about-tidbit">
                            <div>
                                Headquarters
                            </div>
                            <div>
                                { }
                            </div>
                        </div>
                        <div className="details-page-about-tidbit">
                            <div>
                                Founded
                            </div>
                            <div>
                                { }
                            </div>
                        </div>
                    </div> */}
                    </div>
                    <div className="details-page-about-header">Key Statistics</div>
                    <div className="details-page-about-key-statistics-container">
                        <KeyStatistics details={assetDetails} quote={assetQuote} />
                    </div>
                    <div className="details-page-news-container">
                        {!!news && news.length > 0 && (
                            <>
                                <div className="details-page-about-header news">News</div>
                                {news.map((article) => (
                                <NewsArticle
                                    key={article.id}
                                    headline={article.headline}
                                    image={article.image}
                                    summary={article.summary}
                                    url={article.url}
                                    source={article.source}
                                />
                                ))}
                            </>
                        )}
                    </div>
                </div>
                <div className="details-page-right-container">
                    <BuySellForm quote={assetQuote} />
                    <button>
                        + Add to Lists
                    </button>
                </div>
            </div>
        </>
    );
}

export default DetailsPage;
