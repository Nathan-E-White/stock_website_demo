const axios = require("axios");

export const LoadRecentNewsForStock = (symbol: string, version: string, token: string) => {

    const api = axios.create ({
        baseURL: "https://cloud.iexapis.com/stable/"
    });

    return api.get (`stock/${symbol}/news?token=${token}`)
              .then ((res: any) => {
                  return res.data;
              })
              .catch ((err: Error) => {
                  console.log (`API Error <LoadRecentNewsForStock>: ${err.message}`);
              });
};

export default LoadRecentNewsForStock;
