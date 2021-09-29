import * as React from "react";

import NewsItem from "./NewsItem";

export const NewsList = ({news}: any) => (
    <div>{news.map ((newsItem: any, index: any) => {
        return <div key={'news' + index}>
            <hr/>
            <NewsItem {...newsItem}/>
        </div>;
    })}
    </div>
);

export default NewsList;
