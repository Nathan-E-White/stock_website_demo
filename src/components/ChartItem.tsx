import * as React from "react";

interface IChartItem {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    stockIsUp: boolean;
    // unadjustedVolume: number;
    // change: number;
    // changePercent: number;
    // vwap: number;
    // label: string;
    // changeOverTime: string;
}

export const ChartItem = (ci: IChartItem) => {
    return (
        <tr>
            <th scope="row">{ci.date}</th>
            <td>{ci.open}</td>
            <td>{ci.high}</td>
            <td>{ci.low}</td>
            <td className={ci.stockIsUp ? 'text-success' : 'text-danger'}>
                {ci.stockIsUp ? String.fromCharCode (9650) + ' ' + ci.close : String.fromCharCode () + ' ' + ci.close}
            </td>
        </tr>
    );
};

export default ChartItem;
