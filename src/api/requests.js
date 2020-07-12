import axios from "axios";

export function getStockPrices(url, token, prices, updateState) {
  axios
    .get(url, {
      headers: {
        Authorization: "Token " + token,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        prices = [...prices, ...response.data.results];

        if (response.data.next !== null) {
          getStockPrices(response.data.next, token, prices, updateState);
        } else {
          updateState({
            type: "update stock prices",
            stocks: prices,
          });
        }
      }
    });
  return;
}

export function getStockList(url, token, stocks, updateState) {
  axios
    .get(url, {
      headers: {
        Authorization: "Token " + token,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        stocks = [...stocks, ...response.data.results];

        if (response.data.next !== null) {
          getStockList(response.data.next, token, stocks, updateState);
        } else {
          updateState({
            type: "update stocks",
            stocks: stocks,
          });
        }
      }
    });
  return;
}
