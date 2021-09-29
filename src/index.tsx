import * as React     from "react";
import * as ReactDOM  from "react-dom";
import App            from "./App";
import {createClient} from 'redis';
import "./index.css";

const handleRedisError = (err: Error) => console.log (`Redis Error: ${err.message}`);
const redisClient = createClient ();
redisClient.on ('error', handleRedisError);
redisClient.connect ();

const docRoot = document.getElementById ('root');

ReactDOM.render (
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
