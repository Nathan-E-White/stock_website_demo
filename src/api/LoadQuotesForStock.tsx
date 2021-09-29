import axios from "axios";

export const LoadQuotesForStock = (symbol = "", version = "sandbox", token = "") => {

    const api = axios.create ({
        baseURL: "https://cloud.iexapis.com/stable/"
    });

    const apiGet = (res: any) => {
        if (res.hasOwnProperty ("data")) {
            return res.data;
        } else {
            throw Error (`API Error: GET request returned object but did not include desired data.`);
        }
    };

    const errCat = (err: Error) => {
        console.log (`API Error <LoadQuotesForStock>: ${err.message}`);
    };

    return api.get (`stock/${symbol}/quote?token=${token}`)
              .then (apiGet)
              .catch (errCat);
};

// noinspection JSUnusedGlobalSymbols
export default LoadQuotesForStock;

