import * as React     from 'react';
import './App.css';


import GetStockData from "./api/LoadQuotesForStock";
import GetStockLogo from "./api/LoadLogoForStock";
import GetStockNews from "./api/LoadRecentNewsForStock";
import GetStockChar from "./api/LoadChartForStock";


//const FormEditor = require ("./components/FormEditor");

// const redis = require ('redis');
// const zmq = require ('zeromq');

// const callProductionAPI: boolean = false;


// noinspection JSUnusedLocalSymbols
const apiSandboxToken: string = "Tpk_c86ba05004a64fd8b43b29929c446e2c";
const productionToken: string = "pk_9d26fd1fee7d490986975ab1ef317b8b";
const useToken = productionToken;

interface IAppProps {
//    error?: any;
//    enteredSymbol: string;
//    quote?: any;
//    quoteHistory: Array<any>;
//    showHistory: Array<any>;
//    news: Array<any>;
//    chart: Array<any>;
//    showAllNews: boolean;
//    showAllChart: boolean;
}

interface IAppState {
    error?: any;                // Most recent error
    enteredSymbol: string;      // Submitted symbol
    symbol: string              // Parsing input
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
            logoURL:       null
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
    composeAsync = (...funcs: any) => x => {
        return funcs.reduce (this.applyAsync, Promise.resolve (x));
    };

    componentDidMount () {
        this.loadQuote ();
    }

    loadQuote = () => {

        const nxtSym: string = "XOM";

        const pullData = this.composeAsync (GetStockData, GetStockLogo, GetStockNews, GetStockChar);
        const quoteRes = pullData (nxtSym)
            .then (this.pushData)
            .catch (this.errCatQuote);

        const pushPrev = (previousState: any, quoteWithLogo: any, news: any, chart: any) => {
            const history = previousState?.quoteHistory ?? [];
            history.push ({...quoteWithLogo});
            return {
                quote:        quoteWithLogo,
                error:        null,
                quoteHistory: history,
                news:         news,
                chart:        chart,
            };
        };

        const retDes = (values: any) => {
            const [quote, logo, news, chart] = values;
            const quoteWithLogo = {...quote, logo: logo};
            const nxtState = pushPrev (this.state, quoteWithLogo, news, chart);
            this.setState (nxtState);
        };

        /* Note: Promise.all([f, g, ...]) runs f, g, ... in parallel async */
        Promise.all ([
                   GetStockData (nxtSym, "stable", useToken),
                   GetStockLogo (nxtSym, "stable", useToken),
                   GetStockNews (nxtSym, "stable", useToken),
                   GetStockChar (nxtSym, "stable", useToken)
               ])
               .then (retDes)
               .catch ((err: Error) => this.errCat (err, "GetQuote"));

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
        if (event.keyCode === 0xD) {
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

}
