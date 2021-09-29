import axios from "axios";

export const LoadChartForStock = (symbol: string, version: string, token: string) => {

    const api = axios.create ({
        baseURL: "https://cloud.iexapis.com/stable/"
    });

    const apiRet = (res: any) => {
        if (res.hasOwnProperty ("data")) {
            return res.data;
        } else {
            throw Error (`API Error: GET call returned no data.`);
        }
    };

    const errCat = (err: Error) => {
        console.log (`API Error <LoadChartForStock>: ${err.message}`);
    };

    return api.get (`stock/${symbol}/chart?token=${token}`)
              .then (apiRet)
              .catch (errCat);
};

export default LoadChartForStock;
