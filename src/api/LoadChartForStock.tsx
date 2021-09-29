import axios from "axios";

export const LoadChartForStock = (symbol: string, version: string, token: string) => {

    const api = axios.create ({
        baseURL: "https://cloud.iexapis.com/stable/"
    });

    return api.get (`stock/${symbol}/chart?token=${token}`)
              .then ((res: any) => {
                  return res.data;
              })
              .catch ((err: Error) => {
                  console.log (`API Error <LoadChartForStock>: ${err.message}`);
              });
};

export default LoadChartForStock;
