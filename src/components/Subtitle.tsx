import {Text}     from "react-super-styled";
import * as React from "react";

interface ISubtitleProps {

}

const Subtitle = (props: ISubtitleProps) => {
    return <Text color="black" italic large>
        Your new dashboard serving up just the latest stock data:
        <a
            href="https://iexcloud.io"
            title="IEX Required data disclaimer.">
            Data provided by IEX Cloud
        </a>
    </Text>;
};

export default Subtitle;
