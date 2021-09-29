import * as React     from "react";
import * as ReactDOM  from "react-dom";
import App            from "./App";
// import {createClient} from 'redis';
import "./index.css";

//const handleRedisError = (err: Error) => console.log (`Redis Error: ${err.message}`);
//const redisClient: any = createClient ();
//redisClient.on ('error', handleRedisError);
//redisClient.connect ();



ReactDOM.render (
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById ('root')
);
// <App redisHandle={redisClient}/>
