import * as React from "react";

interface INewsItem {
    datetime: string;
    headline: string;
    source: string;
    url: string;
    summary: string;
}

export const NewsItem = (ni: INewsItem) => {
    return (
        <div>
            <a href={ni.url} target="_blank" rel="noreferrer" title={`Article via ${ni.source}`}><h3>{ni.headline}</h3></a>
            <div>
                Source: <em>{ni.source}</em>, {ni.datetime.substring (0, 10)}
            </div>
            <div>
                <p>{ni.summary}</p>
            </div>
        </div>
    );
};

// noinspection JSUnusedGlobalSymbols
export default NewsItem;
