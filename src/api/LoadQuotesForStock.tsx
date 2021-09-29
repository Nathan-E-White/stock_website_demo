import axios from "axios";

export const LoadQuotesForStock = (symbol = "", version = "sandbox", token = "") => {

    const api = axios.create({
        baseURL: "https://cloud.iexapis.com/stable/"
    });

    return api.get (`stock/${symbol}/quote?token=${token}`)
              .then ((res: any) => {
                  return res.data;
              })
              .catch ((err: Error) => {
                  console.log (`API Error <LoadQuotesForStock>: ${err.message}`);
              });
};

export default LoadQuotesForStock;

