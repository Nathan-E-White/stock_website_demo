import * as React from "react";

const NewsItem = require("./NewsItem");

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
