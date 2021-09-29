import * as React from "react";

interface IStockInfo {
    symbol: string;
    companyName: string;
    primaryExchange: string;
    latestPrice: number;
    latestSource: string;
    week52high: number;
    week52low: number;
    logo: string;
}

// TODO: Do we put a span in the last list item??
export const StockInfo = (si: IStockInfo) => {
    return (
        <div className="card">
            <div className="card-body d-flex flex-wrap">
                <img className="p-2" src={si.logo} alt=""/>
                <h2 className="card-title p-2"><strong>{si.symbol} - {si.companyName}</strong></h2>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>{si.latestSource}</strong><span
                    className="text-primary">{si.latestPrice}</span></li>
                <li className="list-group-item"><strong>52 Week High</strong><span
                    className="text-success">{si.week52high}</span></li>
                <li className="list-group-item"><strong>52 Week Low</strong><span
                    className="text-success">{si.week52low}</span></li>
                <li className="list-group-item"><strong>Exchange</strong>{si.primaryExchange}</li>
            </ul>
        </div>
    );
};

// noinspection JSUnusedGlobalSymbols
export default StockInfo;
