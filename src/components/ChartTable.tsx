import * as React from "react";

const ChartItem = require ("./ChartItem");

export const ChartTable = ({chart}: any) => (
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
            {chart.map ((chartItem: any, index: any) => {
                return chartItem.change < 0 ? (
                    <ChartItem key={'chartTable' + index}{...chartItem} stockIsUp/>
                ) : (
                    <ChartItem key={'chartTable' + index}{...chartItem} />
                );
            })}
            </tbody>
        </table>
    </div>
);

// noinspection JSUnusedGlobalSymbols
export default ChartTable;
