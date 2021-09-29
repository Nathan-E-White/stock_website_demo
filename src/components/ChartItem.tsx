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

    let siuLabel: string, siuBody: string;

    const hasOHL = ci.hasOwnProperty ("open") && ci.hasOwnProperty ("high") && ci.hasOwnProperty ("low");
    const hasPro = ci.hasOwnProperty ("stockIsUp") && hasOHL;

    if (hasPro) {
        if (ci.stockIsUp) {
            siuLabel = 'text-success';

            /* Magic number isn't doing anything to code, just calling a character code */
            // noinspection MagicNumberJS
            siuBody = `${String.fromCharCode (0x25b2)} ${ci.close}`;
        } else {
            siuLabel = 'text-danger';
            siuBody = `${String.fromCharCode ()} ${ci.close}`;

        }

        return (
            <tr>
                <th scope="row">{ci.date}</th>
                <td>{ci.open}</td>
                <td>{ci.high}</td>
                <td>{ci.low}</td>
                <td className={siuLabel}>{siuBody}</td>
            </tr>
        );
    } else {
        throw Error (`<ChartItem>: CI object given to function component was missing one or more fields.`);
    }
};

// noinspection JSUnusedGlobalSymbols
export default ChartItem;
