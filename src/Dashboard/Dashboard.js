import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { DashBoardTable } from "../components/DashboardTable";
import { CapitalizerContext } from "../Context";
import axios from "axios";

export function DashboardPage() {
    const [context,] = useContext(CapitalizerContext);
    const [buyTable, setBuyTable] = useState(false);
    const [sellTable, setSellTable] = useState(false);

    //const blankPriceList = [
    //    { 'id': 0, 'stock': "BLANK", 'date': new Date("2020-01-01"), 'predicted_closing_price': 100, 'opening_price': 100, 'actual_closing_price': 100, 'daily_high': 100, 'daily_low': 100, 'volume': 10000 },
    //    { 'id': 1, 'stock': "BLANK", 'date': new Date("2020-01-02"), 'predicted_closing_price': 100, 'opening_price': 100, 'actual_closing_price': 200, 'daily_high': 100, 'daily_low': 100, 'volume': 10000 },
    //    { 'id': 2, 'stock': "BLANK", 'date': new Date("2020-01-03"), 'predicted_closing_price': 100, 'opening_price': 100, 'actual_closing_price': 500, 'daily_high': 100, 'daily_low': 100, 'volume': 10000 },
    //    { 'id': 3, 'stock': "BLANK", 'date': new Date("2020-01-04"), 'predicted_closing_price': 100, 'opening_price': 100, 'actual_closing_price': 300, 'daily_high': 100, 'daily_low': 100, 'volume': 10000 },
    //    { 'id': 4, 'stock': "BLANK", 'date': new Date("2020-01-05"), 'predicted_closing_price': 100, 'opening_price': 100, 'actual_closing_price': 400, 'daily_high': 100, 'daily_low': 100, 'volume': 10000 },
    //];

    const getPrices = (stockObjs, stateUpdateFunc) => {
        const stocks = [];
        const stockPromises = [];
        // Iterate over the top 5 stocks
        for(let i = 0; i < 5; i++){
            const priceIndices = stockObjs[i].stock_prices;
            const pricePromises = [];  // Array of response promises

            if (priceIndices.length > 4){   // Check to make sure the stock has at least 5 prices recorded
                const prices = [];

                // Iterate over the 5 most recent stock prices
                for(let j = priceIndices.length - 1; j > priceIndices.length - 6; j--){
                    
                    // Send async requests, add promise for result to the pricePromises array
                    pricePromises.push(
                        axios.get("http://localhost:8000/api/v1/stock-price/" + priceIndices[j], {headers: {Authorization: "Token " + context.authToken}}).then((resp) => {
                            if (resp.status === 200){
                                prices.push(resp.data);
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                    );
                }
                stockPromises.push(
                    // Wait for all price promises to resolve
                    Promise.allSettled(pricePromises).then((results) => {

                        // Combine price data with the stock data and add to the stocks array
                        stocks.push({stock: stockObjs[i], prices: cleanPricesArray(prices)});
                    })
                );
            }
        }
        // Wait for all stocks to get all prices
        Promise.allSettled(stockPromises).then(() => {
            
            // Update the state with a new table with the new data
            stateUpdateFunc(<DashBoardTable stocks={stocks}></DashBoardTable>);
        })
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/stock/", {headers: {Authorization: "Token " + context.authToken}}).then((response) => {
            // On success response, get the stock prices for these stocks
            if (response.status === 200){
                getPrices(response.data, setBuyTable);
            }
            else{
                console.error("Error getting stocks: " + response.status + ": " + response.statusText);
            }
        }).catch((err) => {
            console.error("Error getting stocks: " + err);
        });

        axios.get("http://localhost:8000/api/v1/stock/", {headers: {Authorization: "Token " + context.authToken}}).then((response) => {
            // On success response, get the stock prices for these stocks
            if (response.status === 200){
                getPrices(response.data, setSellTable);
            }
            else{
                console.error("Error getting stocks: " + response.status + ": " + response.statusText);
            }
        }).catch((err) => {
            console.error("Error getting stocks: " + err);
        });
    }, []);
    
    
    const user = "USER"; // TODO: Pull from user data in context

    return (
        <section>
            <header
                style={{ "marginTop": "3%" }}
            >
                <WelcomeMessage>Hello, {user}</WelcomeMessage>
                <BuySellMessage>Here are our suggested buys for you today...</BuySellMessage>
            </header>
            {buyTable ? buyTable : <div></div>}
            <header>
                <BuySellMessage>And here are the stocks we would avoid or sell...</BuySellMessage>
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