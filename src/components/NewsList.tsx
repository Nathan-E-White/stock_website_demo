import * as React from "react";

import NewsItem from "./NewsItem";

export const NewsList = ({news}: any) => {

    const newsMap = (newsItem: any, index: any) => {
        return (
            <div key={`news${index}`}>
                <hr/>
                <NewsItem {...newsItem}/>
            </div>
        );
    };

    return <div>{news.map (newsMap)}</div>;
};

// noinspection JSUnusedGlobalSymbols
export default NewsList;
