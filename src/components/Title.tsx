import * as React  from "react";
import {Heading}   from "react-super-styled";


interface ITitleProps {
}

const Title = (props: ITitleProps) => {
    return <Heading
        as="h2"
        color="black"
        margin={0}
        italic
        underline
        xxLarge
        className='.PageTitle'
    >
        Stock Market App via React
    </Heading>;
};

export default Title;
