import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { DashBoardTable } from "../components/DashboardTable";
import { CapitalizerContext } from "../Context";
import axios from "axios";

const url = "http://localhost:8000/api/v1/";

export function DashboardPage() {
    const [context,] = useContext(CapitalizerContext);
    const [buyTable, setBuyTable] = useState(false);
    const [sellTable, setSellTable] = useState(false);

    // Pull data for both tables on the dashboard
    useEffect(() => {
        const now = new Date("2020", "06", "05");//new Date(); // TODO: Remove static date
        // Convert date to format for get request parameter
        const suggestionDate = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, '0') + "-" + String(now.getDate()).padStart(2, '0');
        
        // Get the suggestions from the api
        axios.get(url + "suggestion/?date=" + suggestionDate, {headers: {Authorization: "Token " + context.authToken}}).then((response) => {
            // Sort the suggestions based on the predicted percent change
            const suggestions = response.data.suggestions.sort((s1, s2) => {
                return s1.percent_change - s2.percent_change;
            });

            // Display the top/bottom 5 stocks with best/worst predicted percent change
            // Populate the respective table with the data

            // 5 stocks with the best predicted closing; highest percent change
            const topStocks = []
            for (let i = suggestions.length - 1; i > suggestions.length - 6; i--){
                topStocks.push(response.data.suggestions[i].stock);
            }
            populateTable(topStocks, setBuyTable, context.authToken);
            
            // 5 stocks with the worst predicted closing; lowest percent change
            const bottomStocks = [];
            for (let i = 0; i < 5; i++){
                bottomStocks.push(response.data.suggestions[i].stock);
            }
            populateTable(bottomStocks, setSellTable, context.authToken);
        }).catch((err) => {
            console.error("Error connecting to server: " + err);
        })
    }, [context.authToken]);
    
    
    const user = "USER"; // TODO: Pull from user data in context

    return (
        <section>
            <header
                style={{ "marginTop": "3%" }}
            >
                <WelcomeMessage>Hello, {user}</WelcomeMessage>
                <BuySellMessage>Here are the top performing stock predictions for today...</BuySellMessage>
            </header>
            {buyTable ? buyTable : <div></div>}
            <header>
                <BuySellMessage>And here are the bottom performing stock predictions for today...</BuySellMessage>
            </header>
            {sellTable ? sellTable : <div></div>}
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

const populateTable = (stockSymbols, stateUpdateFunc, apiToken) => {
    const stocks = []
    const stockPromises = [];

    // Get the stock data from the API using the given symbols
    for (let i = 0; i < stockSymbols.length; i++){
        stockPromises.push(
            axios.get(url + "stock/" + stockSymbols[i], {headers: {Authorization: "Token " + apiToken}}).then((response) => {
                if (response.status === 200){
                    // Add the data to the stocks array
                    stocks.push(response.data);
                }
                else{
                    console.error("Error getting stock (" + stockSymbols[i].stock + "): " + response.status + ": " + response.statusText);
                }
            }).catch((err) => {
                console.error("Error getting stock (" + stockSymbols[i].stock + "): " + err);
            })
        );
    }
    // When all stock data resolves
    Promise.allSettled(stockPromises).then(() => {
        // Get the price data for each stock
        getPrices(stocks, stateUpdateFunc, apiToken);
    });
}

const getPrices = (stockObjs, stateUpdateFunc, apiToken) => {
    const stocks = [];
    const stockPromises = [];

    // Iterate over the stock objects
    for(let i = 0; i < stockObjs.length; i++){
        stockPromises.push(
            axios.get(url + "stock-price/", {headers: {Authorization: "Token " + apiToken}, params: {"recent": stockObjs[i].symbol}}).then((resp) => {
                if (resp.status === 200){
                    // Combine price data with the stock data and add to the stocks array
                    stocks.push({stock: stockObjs[i], prices: cleanPricesArray(resp.data.results)});
                }
            }).catch((err) => {
                console.error(err);
            })
        );
    }
    
    // Wait for all stocks to get all prices
    Promise.allSettled(stockPromises).then(() => {
        
        // Update the state with a new table with the new data
        stateUpdateFunc(<DashBoardTable stocks={stocks}></DashBoardTable>);
    })
}

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
            else if (key === "date") {
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

//const BlankTable = () => {
//    const blankStocks = [
//        { "name": "BLANK Inc.", "symbol": "BLANK0", "category": "None", "stock_prices": [0, 1, 2, 3, 4] },
//        { "name": "BLANK Inc.", "symbol": "BLANK1", "category": "None", "stock_prices": [0, 1, 2, 3, 4] },
//        { "name": "BLANK Inc.", "symbol": "BLANK2", "category": "None", "stock_prices": [0, 1, 2, 3, 4] },
//        { "name": "BLANK Inc.", "symbol": "BLANK3", "category": "None", "stock_prices": [0, 1, 2, 3, 4] },
//        { "name": "BLANK Inc.", "symbol": "BLANK4", "category": "None", "stock_prices": [0, 1, 2, 3, 4] },
//    ];
//    const blankPriceList = [
//        { 'id': 0, 'stock': "BLANK", 'date': new Date("2020-01-01"), 'predicted_closing_price': 100, 'opening_price': 100, 'actual_closing_price': 100, 'daily_high': 100, 'daily_low': 100, 'volume': 10000 },
//        { 'id': 1, 'stock': "BLANK", 'date': new Date("2020-01-02"), 'predicted_closing_price': 100, 'opening_price': 100, 'actual_closing_price': 100, 'daily_high': 100, 'daily_low': 100, 'volume': 10000 },
//        { 'id': 2, 'stock': "BLANK", 'date': new Date("2020-01-03"), 'predicted_closing_price': 100, 'opening_price': 100, 'actual_closing_price': 100, 'daily_high': 100, 'daily_low': 100, 'volume': 10000 },
//        { 'id': 3, 'stock': "BLANK", 'date': new Date("2020-01-04"), 'predicted_closing_price': 100, 'opening_price': 100, 'actual_closing_price': 100, 'daily_high': 100, 'daily_low': 100, 'volume': 10000 },
//        { 'id': 4, 'stock': "BLANK", 'date': new Date("2020-01-05"), 'predicted_closing_price': 100, 'opening_price': 100, 'actual_closing_price': 100, 'daily_high': 100, 'daily_low': 100, 'volume': 10000 },
//    ];
//    const stocks = [
//        {stock: blankStocks[0], prices: blankPriceList},
//        {stock: blankStocks[1], prices: blankPriceList},
//        {stock: blankStocks[2], prices: blankPriceList},
//        {stock: blankStocks[3], prices: blankPriceList},
//        {stock: blankStocks[4], prices: blankPriceList},
//    ];
//
//    return <DashBoardTable stocks={stocks}></DashBoardTable>
//}