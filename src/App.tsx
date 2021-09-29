import * as React     from 'react';
// import * as Redis from "redis";

import {css} from 'styled-components';
import {Heading, Text} from "react-super-styled";

// @ts-ignore
import AppCss from  "./App.css";

const PageTitle = AppCss.PageTitle;

import GetStockData   from "./api/LoadQuotesForStock";
import GetStockLogo   from "./api/LoadLogoForStock";
import GetStockNews   from "./api/LoadRecentNewsForStock";
import GetStockChar   from "./api/LoadChartForStock";
import ChartTable     from "./components/ChartTable";
import ChartLineGraph from "./components/ChartLineGraph";
import NewsList       from "./components/NewsList";
import StockInfo      from "./components/StockInfo";

// const redis = require ('redis');
// const zmq = require ('zeromq');

// noinspection JSUnusedLocalSymbols
const apiSandboxToken: string = "Tpk_c86ba05004a64fd8b43b29929c446e2c";
const productionToken: string = "pk_9d26fd1fee7d490986975ab1ef317b8b";
const useToken = productionToken;

interface IAppProps {
//    redisHandle: any
}

interface IAppState {
    error?: any;
    enteredSymbol: string;
    symbol: string;
    quote?: any;
    quoteHistory: Array<any>;
    showHistory: Array<any>;
    news: Array<any>;
    chart: Array<any>;
    showAllNews: boolean;
    showAllChart: boolean;
    logo: string;
    logoURL: URL;
}

// noinspection JSClassNamingConvention
class App extends React.Component <IAppProps, IAppState> {

    constructor (props: any) {

        /* Super! */
        super (props);

        /* Set the initial app state */
        this.state = {
            error:         null,
            enteredSymbol: "XOM",
            symbol:        "",
            quote:         null,
            quoteHistory:  [],
            showHistory:   [],
            news:          [],
            chart:         [],
            showAllNews:   false,
            showAllChart:  false,
            logo:          "",
            logoURL:       new URL("https://www.google.com")
        };
    }

    errCat = (error: Error, fName: string) => {
        console.log (`Error ${fName}: ${error.name}, ${error.message}`);
        this.setState ({error: error});
    };

    errCatQuote = (error: Error) => this.errCat (error, "GetQuote");

    setLogoURL = () => {
        /* Build the URL for the logo from the API return value */
        const url = new URL (this.state.logo);

        /* Force https */
        if (url.protocol !== 'https') {
            url.protocol = 'https';
        }

        this.setState ({
            logoURL: new URL (url.toString ()),
        });
    };


    applyAsync = (acc: any, val: any) => acc.then (val);

    // noinspection AnonymousFunctionJS
    composeAsync = (...funcs: any) => (x: any) => {
        return funcs.reduce (this.applyAsync, Promise.resolve (x));
    };

    componentDidMount () {
        this.loadQuote ();
    }

    loadQuote = () => {

        const nxtSym: string = "XOM";

    };

    onChangeEnteredSymbol = (event: any) => {
        /* <input> text value entered by user changed */
        const value = event.target.value
                           .trim ()
                           .toUpperCase ()
                           .slice (0, 4);

        /* Update the saved symbol value */
        this.setState ({
            enteredSymbol: value
        });
    };

    onKeyDownPressEnter = (event: any) => {
        // noinspection MagicNumberJS
        if (event.keyCode === 0x000D) {
            this.loadQuote ();
        }
    };

    onClickShowHistory = () => {
        this.setState ((prevState): any => {
            const showHistory = prevState.showHistory;
            return {
                showHistory: !showHistory
            };
        });
    };

    onClickShowAllChart = () => {
        this.setState ((prevState: { showAllChart: any; }) => {
            const showAllChart = prevState.showAllChart;
            return {
                showAllChart: !showAllChart,
            };
        });
    };

    onClickShowAllNews = () => {
        this.setState ((prevState: { showAllNews: any; }) => {
            const showAllNews = prevState.showAllNews;
            return {
                showAllNews: !showAllNews,
            };
        });
    };


    render (): JSX.Element {

        const st: IAppState = this.state;

        let
            quote,
            enteredSymbol,
            quoteHistory,
            showHistory,
            news,
            showAllNews,
            chart,
            showAllChart,
            error,
            chartReverse,
            chartReverseMin,
            quoteHistoryReverse,
            newsMin,
            companyName;

        if (st) {
            if (st.quote) {
                quote = st.quote;
                companyName = !!quote && quote.companyName;
            }

        }

        if (st) {
            if (st.enteredSymbol) {
                enteredSymbol = st.enteredSymbol;
            }

        }

        if (st && st.quoteHistory) {
            quoteHistory = st.quoteHistory;
            quoteHistoryReverse = [...quoteHistory].reverse ();
        } else {
            quoteHistory = [];
            quoteHistoryReverse = [];
        }

        if (st && st.showHistory) {
            showHistory = st.showHistory;
        }
        if (st) {
            if (st.news) {
                news = st.news;
                newsMin = [...news].slice (0, 2);
            }
        }
        if (st) {
            if (st.showAllNews) {
                showAllNews = st.showAllNews;
            }
        }
        if (st) {
            if (st.chart) {
                chart = st.chart;
                chartReverse = [...chart].reverse ();
                chartReverseMin = chartReverse.slice (0, 12);
                const chartCloses = [];
                const chartDates = [];
                chart.map ((chartItem: { label: any; close: any; }) => {
                    chartDates.push (chartItem.label);
                    chartCloses.push (chartItem.close);
                    return null;
                });
            }
        }
        if (st) {
            if (st.showAllChart) {

                showAllChart = st.showAllChart;
            }
        }
        if (st) {

            if (st.error) {
                error = st.error;
            }
        }


        return (
            <div className="App pb-3">
                <div className="jumbotron jumbotron-fluid bg-dark text-light">
                    <div className="container">

                        <Heading as="h2" color="black" margin={0} italic underline xxLarge className={PageTitle}>
                            Stock Market App via React
                        </Heading>

                        <Text color="black" italic large>
                            Your new dashboard serving up just the latest stock data:
                            <a
                                href="https://iexcloud.io"
                                title="IEX Required data disclaimer.">
                                Data provided by IEX Cloud
                            </a>
                        </Text>

                        <div className="row">
                            <div className="col input-group">
                                <input
                                    value={enteredSymbol}
                                    type="text"
                                    className="form-control"
                                    placeholder="Symbol e.g. XOM"
                                    aria-label="Symbol"
                                    onChange={this.onChangeEnteredSymbol}
                                    onKeyDown={this.onKeyDownPressEnter}
                                />
                                <span className="input-group-btn">
                                    <button
                                        className="btn btn-secondary"
                                        type="button"
                                        onClick={this.loadQuote}
                                    >
                                        Load Quote
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        {!!error && (
                            <div className="col alert alert-danger" role="alert">
                                <h4 className="alert-heading">Whoops! This isn&apos;t supposed to happen...</h4>
                                <p>{error.message}</p>
                            </div>
                        )}
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <h2>Latest Quote</h2>
                            {!!quote ? <StockInfo {...quote} logo={this.state.logo}/> : <p>Loading...</p>}

                            <div className="mt-3">
                                <button
                                    className="btn btn-dark btn-block"
                                    onClick={this.onClickShowHistory}
                                >
                                    {showHistory
                                        ? "Hide Previous Quotes"
                                        : "Show Previous Quotes"}
                                </button>
                            </div>

                            <div className="mt-3">
                                {showHistory && !!quoteHistory && (
                                    <div>
                                        <h2 className="text-center">Previous Quotes</h2>
                                        {quoteHistoryReverse.map ((quoteHistoryItem, index) => {
                                            return (
                                                <div key={`quote + ${index}`}>
                                                    <StockInfo {...quoteHistoryItem} />
                                                    <hr/>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="mt-5">
                                <h2>{!!companyName && `News about " + ${companyName}`}</h2>
                                {!showAllNews && !!newsMin && <NewsList news={newsMin}/>}
                                {showAllNews && !!news && (
                                    <div>
                                        <NewsList news={news}/>
                                    </div>
                                )}
                                <button
                                    className="btn btn-dark btn-block"
                                    onClick={this.onClickShowAllNews}
                                >
                                    {showAllNews ? "Show Less" : "Show All"}
                                </button>
                            </div>
                        </div>

                        <div className="col">
                            {!!chart && (
                                <div className="charts">
                                    <h2 className="text-center">
                                        {!!companyName && `${companyName} (Past 6 months)`}
                                    </h2>


                                </div>
                            )}

                            <div className="mt-3">
                                {!showAllChart && !!chartReverseMin && (
                                    <ChartTable chart={chartReverseMin}/>
                                )}
                                {showAllChart && !!chartReverse && (
                                    <ChartTable chart={chartReverse}/>
                                )}
                                <button
                                    className="btn btn-dark btn-block"
                                    onClick={this.onClickShowAllChart}
                                >
                                    {showAllChart ? "Show Less" : "Show All"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
