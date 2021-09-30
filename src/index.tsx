import * as React    from "react";
import * as ReactDOM from "react-dom";
import App           from "./App";
import "./index.css";


import moment from "moment";
import crypto from "crypto";
import https  from "https";

const method: string = 'GET';
const host: string = 'cloud.iexapis.com';

const access_key: string = process.env.IEX_PUBLIC_KEY;
const secret_key: string = process.env.IEX_SECRET_KEY;

const canonical_querystring = `token=${access_key}`;
const canonical_uri = `/v1/stock/aapl/company`;

const timeStamp = moment.utc ();
const iexDate = `${timeStamp.format ("YYYYMMDDTHHmmss")}Z`;
const dateStamp = timeStamp.format ("YYYYMMDD");

const sign = (secret: string, data: string) => crypto
    .createHmac ('sha256', secret)
    .update (data, "utf8")
    .digest ("hex");

const getSignatureKey = (key: string, datestamp: string) => {
    const signedDate = sign (key, datestamp);
    return sign (signedDate, 'iex_request');
};

/* Bail out if we don't have a good signature key */
if (!access_key || !secret_key) {
    console.warn ('No access key is available');
    process.exit (1);
}

const canonical_headers: string = `host:${host}\nx-iex-date:${iexDate}\n`;
const signed_headers: string = 'host;x-iex-date';

const payload = '';
const payload_hash = crypto.createHash ('sha256').update (payload).digest ('hex');

const canonical_request = `${method}\n${canonical_uri}\n${canonical_querystring}\n${canonical_headers}\n${signed_headers}\n${payload_hash}`;
const algorithm = 'IEX-HMAC-SHA256';
const credential_scope = `${dateStamp}/iex_request`;

const stsChunkI: string = `${algorithm}`;
const stsChunkII: string = `${iexDate}`;
const stsChunkIII: string = `${credential_scope}`;
const stsChunkIV: string = crypto
    .createHash ('sha256')
    .update (canonical_request, 'utf8')
    .digest ('hex');
const string_to_sign: string = `${stsChunkI}\n${stsChunkII}\n${stsChunkIII}\n${stsChunkIV}`;

const signing_key: string = getSignatureKey (secret_key, dateStamp);

const signature: string = crypto
    .createHmac ('sha256', signing_key)
    .update (string_to_sign, 'utf8')
    .digest ('hex');

const ahChunkI = `${algorithm}`;
const ahChunkII: string = `$Credential=${access_key}/${credential_scope}`;
const ahChunkIII: string = `SignedHeaders=${signed_headers}`;
const ahChunkIV: string = `Signature=${signature}`;
const authorization_header = `${ahChunkI} ${ahChunkII}, ${ahChunkIII}, ${ahChunkIV}`;


const headers = {'x-iex-date': iexDate, 'Authorization': authorization_header,};


const options = {
    host:    host,
    port:    443,
    path:    `${canonical_uri}?${canonical_querystring}`,
    method:  'GET',
    headers: headers,
};

const req = https.request (options, res => {
    res.setEncoding ('utf8');
    res.on ('data', chunk => {
        const parsed = JSON.parse (chunk);
        console.log (parsed);
    });
});

req.end ();


ReactDOM.render (
    <React.StrictMode>
        <App apiToken={useToken}/>
    </React.StrictMode>,
    document.getElementById ('root')
);
// <App redisHandle={redisClient}/>
