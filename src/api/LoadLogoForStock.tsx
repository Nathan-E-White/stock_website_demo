import axios from "axios";

export const LoadLogoForStock = (symbol: string, version: string, token: string) => {

    const api = axios.create ({
        baseURL: "https://cloud.iexapis.com/stable/"
    });

    const apiGet = (res: any) => {
        if (res.hasOwnProperty ("data")) {
            if (res.data.hasOwnProperty ("url")) {
                return res.data.url;
            } else {
                throw Error (`API Error: GET Request wasn't empty but did not include desired payload.`);
            }

        } else {
            throw Error (`API Error: GET Request returned no data.`);
        }
    };

    const errCat = (err: Error) => {
        console.log (`API Error <LoadLogoForStock>: ${err.message}`);
    };

    return api.get (`stock/${symbol}/logo?token=${token}`)
              .then (apiGet)
              .catch (errCat);
};

// noinspection JSUnusedGlobalSymbols
export default LoadLogoForStock;
