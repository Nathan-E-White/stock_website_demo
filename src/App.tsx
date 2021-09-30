import * as React      from 'react';
// import * as Redis from "redis";
import {Heading, Text} from "react-super-styled";

// @ts-ignore
import AppCss     from "./App.css";
import ChartTable from "./components/ChartTable";
import NewsList   from "./components/NewsList";
import StockInfo  from "./components/StockInfo";

import Subtitle from "./components/Subtitle";
import Title    from "./components/Title";

import arrayPushHandler from "./util/ArrayPusher";

// const redis = require ('redis');
// const zmq = require ('zeromq');



interface IAppProps {
    apiToken: string;
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
            logoURL:       new URL ("https://www.google.com")
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
        const retHist = (pState: any) => {
            const showHistory = pState.showHistory;
            return {
                showHistory: !showHistory,
            };
        };

        const nState: any = retHist (this.state);
        this.setState (nState);
    };

    onClickShowAllChart = () => {

        const retChar = (pState: any): any => {
            const showAllChart = pState.showAllChart;
            return {
                showAllChart: !showAllChart,
            };
        };

        const nState: any = retChar (this.state);
        this.setState (nState);
    };

    onClickShowAllNews = () => {
        const retNews = (pState: any): any => {
            return {
                showAllNews: !(pState.showAllNews),
            };
        };

        const nState: any = retNews (this.state);
        this.setState (nState);
    };

    render () {

        const st: IAppState = this.state;

        let quoteHistory,
            chartReverseMin,
            quoteHistoryReverse;

        const quote = st?.quote;
        const companyName = quote?.companyName;
        const enteredSymbol = st?.enteredSymbol;

        if (st && st.quoteHistory) {
            quoteHistory = st.quoteHistory;
            quoteHistoryReverse = [...quoteHistory].reverse ();
        } else {
            quoteHistory = [];
            quoteHistoryReverse = [];
        }

        const showHistory = st?.showHistory;
        const news = st?.news;
        const newsMin = [...st?.news].slice (0, 2);
        const showAllNews = st?.showAllNews;

        /* TODO: better type handling */
        const chartCloses: any[] = [];
        const chartDates: any[] = [];

        const chartMapPusher = (chartItem: { label: any; close: any; }): null => {
            arrayPushHandler (chartDates, chartItem.label);
            arrayPushHandler (chartCloses, chartItem.close);
            return null;
        };

        const chart: any[] = st?.chart;
        const chartReverse: any[] | undefined = [...chart]?.reverse ();
        if (chart && chartReverse) {
            // noinspection MagicNumberJS
            chartReverseMin = chartReverse.slice (0, 12);
        }
        chart.map (chartMapPusher);

        const showAllChart = st?.showAllChart;
        const error = st?.error;

        let historyLabel, newsLabel, chartLabel, quoteDisplay;
        if (showHistory) {
            historyLabel = "Show Previous Quotes";
        } else {
            historyLabel = "Hide Previous Quotes";
        }

        if (showAllNews) {
            newsLabel = "Show All";
        } else {
            newsLabel = "Show Less";
        }

        if (showAllChart) {
            chartLabel = "ShowAll";
        } else {
            chartLabel = "Show Less";
        }

        if (quote) {
            quoteDisplay = <StockInfo {...quote} logo={this.state.logo}/>;
        } else {
            quoteDisplay = <p>Loading...</p>;
        }


        const quoteReverseMapper = (quoteHistoryItem: any, index: number) => {
            return <div key={`quote + ${index}`}>
                <StockInfo {...quoteHistoryItem} />
                <hr/>
            </div>;
        };

        return (
            <div className="App">
                <Title/>
                <Subtitle/>

                <input
                    value={enteredSymbol}
                    type="text"
                    placeholder="Symbol e.g. XOM"
                    aria-label="Symbol"
                    onChange={this.onChangeEnteredSymbol}
                    onKeyDown={this.onKeyDownPressEnter}
                />

                <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={this.loadQuote}
                >
                    Load Quote
                </button>

                {!!error && (
                    <div className="col alert alert-danger" role="alert">
                        <h4>Whoops! This isn&apos;t supposed to happen...</h4>
                        <p>{error.message}</p>
                    </div>
                )}

                <h2>Latest Quote</h2>
                {quoteDisplay}

                <button onClick={this.onClickShowHistory}>{historyLabel}</button>

                <h2>Previous Quotes</h2>
                {quoteHistoryReverse.map (quoteReverseMapper)}

                <h2>{`News about " + ${companyName}`}</h2>
                {!showAllNews && !!newsMin && <NewsList news={newsMin}/>}
                {showAllNews && !!news && (<NewsList news={news}/>)}

                <button onClick={this.onClickShowAllNews}>{newsLabel}</button>

                {!!chart && (<h2>{!!companyName && `${companyName} (Past 6 months)`}</h2>)}

                {!showAllChart && !!chartReverseMin && (<ChartTable chart={chartReverseMin}/>)}
                {showAllChart && !!chartReverse && (<ChartTable chart={chartReverse}/>)}

                <button onClick={this.onClickShowAllChart}>{chartLabel}</button>
            </div>
        );
    }

}

export default App;
