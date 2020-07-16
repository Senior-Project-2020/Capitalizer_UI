import axios from "axios";
import { apiURL } from "../constants";

export function getSuggestions(date, token, updateState) {
    axios
        .get( apiURL + "suggestion/?date=" + date, { 
            headers: { 
               Authorization: "Token " + token,
            },
        })
        .then((response) => {
            if (response.status === 200){
                if (response.data.suggestions === null) {
                  return;
                }

                // Sort the suggestions based on the predicted percent change
                const suggestions = response.data.suggestions.sort((s1, s2) => {
                    return s1.percent_change - s2.percent_change;
                });
                updateState({
                    type: "update suggestions",
                    suggestions: suggestions,
                });
            }
        });
    return;
}

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
            stockPrices: prices,
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