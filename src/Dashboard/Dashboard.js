import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { DashBoardTable, BlankTable } from "../components/DashboardTable";
import { CapitalizerContext } from "../Context";
import { apiURL } from "../constants";
import { getSuggestions, getStockPrices, getStockList } from "../api/requests"
import axios from "axios";
import { isEmpty } from "lodash";

export function DashboardPage() {
    const [context, updateContext] = useContext(CapitalizerContext);
    const buyTable = context.topStocks !== "" ? <DashBoardTable stocks={context.topStocks} reverseTabs={false}></DashBoardTable> : <BlankTable></BlankTable>;
    const sellTable = context.bottomStocks !== "" ? <DashBoardTable stocks={context.bottomStocks} reverseTabs={true}></DashBoardTable> : <BlankTable></BlankTable>;
    const username = isEmpty(context.user) ? "user" : context.user.username;
    
    // Pull user info if it is not in context
    // User info is needed to display username
    useEffect(() => {
        if (context.authToken !== "" && isEmpty(context.user)) {
          axios
            .get(apiURL + "rest-auth/user/", {
              headers: { Authorization: "Token " + context.authToken },
            })
            .then((response) => {
              updateContext({
                type: "update user",
                user: response.data,
              });
            });
        }
      }, [context.authToken, context.user, updateContext]);

    // Load suggestions and stock prices if they are not in the context
    useEffect(() => {
        if (context.authToken !== "") {
            if (isEmpty(context.suggestions)) {
                getSuggestions(getSuggestionDate(), context.authToken, updateContext);
            }
            if (isEmpty(context.stockPrices)) {
                getStockPrices(apiURL + "stock-price/?recent=all", context.authToken, [], updateContext)
            }
            if (isEmpty(context.stocks)) {
                getStockList(apiURL + "stock/", context.authToken, [], updateContext)
            }
        }
    }, [context.authToken, context.suggestions, context.stockPrices, context.stocks, updateContext]);

    // Calculate the top stocks if they are not in the context
    useEffect(() => {
        if (
            !isEmpty(context.suggestions) && 
            !isEmpty(context.stockPrices) && 
            !isEmpty(context.stocks) &&
            isEmpty (context.topStocks)
        ) {
            updateContext({
                type: "update top stocks",
                topStocks: getTableStocks(context.suggestions.length - 5, context.suggestions.length - 1),
            });
        }
    }, [context.suggestions, context.stockPrices, context.stocks, context.topStocks, updateContext]);
    
    // Calculate the bottom stocks if they are not in the context
    useEffect(() => {
        if (
            !isEmpty(context.suggestions) && 
            !isEmpty(context.stockPrices) && 
            !isEmpty(context.stocks) &&
            isEmpty (context.bottomStocks)
        ) {
            updateContext({
                type: "update bottom stocks",
                bottomStocks: getTableStocks(0, 4),
            });
        }
    }, [context.suggestions, context.stockPrices, context.stocks, context.bottomStocks, updateContext]);

    // Gets the stocks from the suggestions context based on the given start and end index (inclusive)
    // The suggestions array is sorted (worst to best) by percent price change
    const getTableStocks = (startIndex, endIndex) => {
        // Sort suggestions based on percent change (worst to best)
        context.suggestions
            .sort((s1, s2) => s1.percent_change - s2.percent_change);
    
        // Gets the stocks given by start and end index
        const stocks = []
        for (let i = startIndex; i <= endIndex; i++) {
            const stock = context.stocks.find(s => s.symbol === context.suggestions[i].stock);
            const stockPrices = context.stockPrices.filter((price) => price.stock === context.suggestions[i].stock);
    
            stocks.push ({
                stock: stock,
                prices: cleanPricesArray(stockPrices),
            });
        }
        return stocks;
    }

    return (
        <section>
            <header
                style={{ "marginTop": "3%" }}
            >
                <WelcomeMessage>Hello {username},</WelcomeMessage>
                <BuySellMessage>Here are the top performing stock predictions for today...</BuySellMessage>
            </header>
            {buyTable}
            <header>
                <BuySellMessage>And here are the bottom performing stock predictions for today...</BuySellMessage>
            </header>
            {sellTable}
        </section>
    );
}

const WelcomeMessage = styled.h1`
    font-size: 40px;
    margin: 0;
    color: white;
    text-align: center;
`;

const BuySellMessage = styled.p`
    font-size: 30px;
    margin: 0;
    color: white;
    text-align: center;
`;

const cleanPricesArray = (prices) => {
    // Convert strings of floats to floats
    // Convert string date to date obj
    prices.forEach(price => {
        for (const [key, value] of Object.entries(price)){
            if (
                key === "actual_closing_price" ||
                key === "daily_high" ||
                key === "daily_low" ||
                key === "opening_price" ||
                key === "predicted_closing_price"
            ) {
                price[key] = Number.parseFloat(value);
            }
            else if (key === "date" && typeof(value) === 'string') {
                const strData = value.split("-");
                price[key] = new Date(strData[0], strData[1] - 1, strData[2]);
            }
        }
    });

    // Sort based on date
    prices.sort((p1, p2) => {
        return p1.date - p2.date;
    });

    return prices;
}

const getSuggestionDate = () => {
    let now = new Date();
    // If saturday or sunday, set now to be friday
    // There are no stock prices recorded on saturday or sunday, so there are no suggestions
    if (now.getDay() === 0){
        now = new Date(now.setDate(now.getDate() - 2));
    }
    else if (now.getDay() === 6){
        now = new Date(now.setDate(now.getDate() - 1));
    }
    // Convert date to format for get request parameter
    return now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, '0') + "-" + String(now.getDate()).padStart(2, '0');
}
