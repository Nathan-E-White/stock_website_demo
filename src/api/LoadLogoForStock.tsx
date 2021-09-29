const axios = require ("axios");

export const LoadLogoForStock = (symbol: string, version: string, token: string) => {

    const api = axios.create ({
        baseURL: "https://cloud.iexapis.com/stable/"
    });

    return api.get (`stock/${symbol}/logo?token=${token}`)
              .then ((res: any) => {
                  return res.data.url;
              })
              .catch ((err: Error) => {
                  console.log (`API Error <LoadLogoForStock>: ${err.message}`);
              });
};

export default LoadLogoForStock;
