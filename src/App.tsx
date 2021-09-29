import * as React from 'react';
import './App.css';

import LoadQuotesForStock     from "./api/LoadQuotesForStock";
import LoadLogoForStock       from "./api/LoadLogoForStock";
import LoadRecentNewsForStock from "./api/LoadRecentNewsForStock";
import LoadChartForStock      from "./api/LoadChartForStock";
import {StockInfo}            from './components/StockInfo';
import {NewsList}             from './components/NewsList';
import {ChartLineGraph}       from './components/ChartLineGraph';
import {ChartTable}           from './components/ChartTable';


//const FormEditor = require ("./components/FormEditor");

// const redis = require ('redis');
// const zmq = require ('zeromq');

// const callProductionAPI: boolean = false;


// noinspection JSUnusedLocalSymbols
const apiSandboxToken: string = "Tpk_c86ba05004a64fd8b43b29929c446e2c";
const productionToken: string = "pk_9d26fd1fee7d490986975ab1ef317b8b";
const useToken: string = productionToken;

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
            logo:          ""
        };
    }

    //render () {
    //    return (
    //        <div className="App">
    //            <SymbolForm
    //                onSymbolChange={this.handleSymbolChange.bind(this)}
    //                onSymbolSubmit={this.handleSymbolSubmit.bind(this)}
    //                symbol={this.state.symbol}
    //                submittedSymbol={this.state.submittedSymbol}
    //            />
    //        </div>
    //    );
    //}


    componentDidMount () {
        this.loadQuote ();
    }

    loadQuote = () => {

        const enteredSymbol: string = "XOM";

        Promise.all ([
                   LoadQuotesForStock (enteredSymbol, "stable", useToken),
                   LoadLogoForStock (enteredSymbol, "stable", useToken),
                   LoadRecentNewsForStock (enteredSymbol, "stable", useToken),
                   LoadChartForStock (enteredSymbol, "6m", useToken)
               ])
               .then ((values: any) => {
                   const [quote, logo, news, chart] = values;
                   // const quoteWithLogo = {...quote, logo: logo};

                   this.setState ({
                       news:  news,
                       chart: chart,
                       quote: quote,
                       logo:  logo,
                   });
                   // this.setState((prevState: any) => { setState({}
                   //           this.setState ((prevState: any) => {
                   //                   if (prevState !== null) {
                   //                     if (prevState.hasOwnProperty ("quoteHistory")) {
                   //                             const history = prevState.quoteHistory;
                   //            history.push ({...quoteWithLogo});
                   //            return {
                   //                quote:        quoteWithLogo,
                   //                error:        null,
                   //                quoteHistory: history,
                   //                news:         news,
                   //                chart:        chart
                   //            };
                   //        }
                   //    }
                   // });
               })
               .catch ((error: any) => {

                   if (error.hasOwnProperty ("response")) {
                       if (error.response.hasOwnProperty ("status")) {
                           if (error.response.status === 404) {
                               const newError = new Error (`The symbol ${enteredSymbol} could not be found.`);
                               this.setState ({error: newError});
                           } else {
                               const msg = `Error <LoadQuote>: Caught error status ${error.response.status}`;
                               const newError = new Error (msg);
                               this.setState ({error: newError});
                           }
                       } else {
                           const msgChunkLHS = "Error <LoadQuote>: Caught error but could not read status";
                           const msgChunkRHS = `code: ${error.message}`;
                           const msg = `${msgChunkLHS} ${msgChunkRHS}`;
                           const newError = new Error (msg);
                       }
                   } else {
                       const msg = `Error <LoadQuote>: Unknown error ${error.message}`;
                       const newError = new Error (msg);
                       this.setState ({error: newError});
                   }
               });
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
        if (event.keyCode === 13) {
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
