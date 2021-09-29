import axios from "axios";

export const LoadRecentNewsForStock = (symbol: string, version: string, token: string) => {

    const api = axios.create ({
        baseURL: "https://cloud.iexapis.com/stable/"
    });

    const apiGet = (res: any) => {
        if (res.hasOwnProperty ("data")) {
            return res.data;
        } else {
            throw Error (`API Error: GET request returned object but not desired data.`);
        }
    };

    const errCat = (err: Error) => {
        console.log (`API Error <LoadRecentNewsForStock>: ${err.message}`);
    };

    return api.get (`stock/${symbol}/news?token=${token}`)
              .then (apiGet)
              .catch (errCat);
};

export default LoadRecentNewsForStock;
