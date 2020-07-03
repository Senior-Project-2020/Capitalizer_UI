import React from "react";
import styled from "styled-components";
import { DashBoardTable } from "../components/DashboardTable";

export function DashboardPage() {
    const stock1 = { "name": "Amazon.com Inc.", "symbol": "AMZN1", "category": "Information Technology", "stock_prices": [0] };
    const stock2 = { "name": "Amazon.com Inc.", "symbol": "AMZN2", "category": "Information Technology", "stock_prices": [0] };
    const stock3 = { "name": "Amazon.com Inc.", "symbol": "AMZN3", "category": "Information Technology", "stock_prices": [0] };
    const stock4 = { "name": "Amazon.com Inc.", "symbol": "AMZN4", "category": "Information Technology", "stock_prices": [0] };
    const stock5 = { "name": "Amazon.com Inc.", "symbol": "AMZN5", "category": "Information Technology", "stock_prices": [0] };
    const price1 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-01"), 'predicted_closing_price': 1123, 'opening_price': 124, 'actual_closing_price': 2124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
    const price2 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-02"), 'predicted_closing_price': 2123, 'opening_price': 124, 'actual_closing_price': 1124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
    const price3 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-03"), 'predicted_closing_price': 3123, 'opening_price': 124, 'actual_closing_price': 5124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
    const price4 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-04"), 'predicted_closing_price': 4123, 'opening_price': 124, 'actual_closing_price': 3124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
    const price5 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-05"), 'predicted_closing_price': 5123, 'opening_price': 124, 'actual_closing_price': 4124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
    const price10 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-01"), 'predicted_closing_price': 5123, 'opening_price': 124, 'actual_closing_price': 4124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
    const price20 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-02"), 'predicted_closing_price': 4123, 'opening_price': 124, 'actual_closing_price': 5124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
    const price30 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-03"), 'predicted_closing_price': 3123, 'opening_price': 124, 'actual_closing_price': 1124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
    const price40 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-04"), 'predicted_closing_price': 2123, 'opening_price': 124, 'actual_closing_price': 3124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
    const price50 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-05"), 'predicted_closing_price': 1123, 'opening_price': 124, 'actual_closing_price': 2124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
    const priceList = [price1, price2, price3, price4, price5]
    const priceList2 = [price10, price20, price30, price40, price50]
    const stocks = [
      {stock: stock1, prices: priceList}, 
      {stock: stock2, prices: priceList2}, 
      {stock: stock3, prices: priceList}, 
      {stock: stock4, prices: priceList2}, 
      {stock: stock5, prices: priceList},
    ]
    
    const user = "USER";

    return (
        <section>
            <header
                style={{ "marginTop": "3%" }}
            >
                <WelcomeMessage>Hello, {user}</WelcomeMessage>
                <BuySellMessage>Here are our suggested buys for you today...</BuySellMessage>
            </header>
            <DashBoardTable stocks={stocks}></DashBoardTable>
            <header>
                <BuySellMessage>And here are the stocks we would avoid or sell...</BuySellMessage>
            </header>
            <DashBoardTable stocks={stocks}></DashBoardTable>
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