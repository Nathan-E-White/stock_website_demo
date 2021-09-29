import * as React from "react";
import ChartItem  from "./ChartItem";

export const ChartTable = ({chart}: any) => {

    const chartMap = (chartItem: any, index: any) => {
        let rtcElement;
        if (chartItem.change < 0) {
            rtcElement = <ChartItem key={`chartTable + ${index}`}{...chartItem} stockIsUp/>;
        } else {
            rtcElement = <ChartItem key={`chartTable + ${index}`}{...chartItem}/>;
        }
        return rtcElement;
    };

    return (
        <div>
            <table className="table">
                <caption>Date and OHLC stock data</caption>
                <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Open</th>
                    <th scope="col">High</th>
                    <th scope="col">Low</th>
                    <th scope="col">Close</th>
                </tr>
                </thead>
                <tbody>
                {chart.map (chartMap)}
                </tbody>
            </table>
        </div>
    );
};

// noinspection JSUnusedGlobalSymbols
export default ChartTable;
