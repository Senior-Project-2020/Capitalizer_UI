import React from "react";
import { NavBar } from "./components/NavBar";
import { SearchBar } from "./components/SearchBar";
import { DashBoardTable } from "./components/DashboardTable";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CapitalizerProvider } from "./Context";
import { StockPage } from "./Stocks/Stocks";
import "./App.css";

function App() {
  var stock1 = { "name": "Amazon.com Inc.", "symbol": "AMZN1", "category": "Information Technology", "stock_prices": [0] };
  var stock2 = { "name": "Amazon.com Inc.", "symbol": "AMZN2", "category": "Information Technology", "stock_prices": [0] };
  var stock3 = { "name": "Amazon.com Inc.", "symbol": "AMZN3", "category": "Information Technology", "stock_prices": [0] };
  var stock4 = { "name": "Amazon.com Inc.", "symbol": "AMZN4", "category": "Information Technology", "stock_prices": [0] };
  var stock5 = { "name": "Amazon.com Inc.", "symbol": "AMZN5", "category": "Information Technology", "stock_prices": [0] };
  var price1 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-01"), 'predicted_closing_price': 1123, 'opening_price': 124, 'actual_closing_price': 2124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
  var price2 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-02"), 'predicted_closing_price': 2123, 'opening_price': 124, 'actual_closing_price': 1124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
  var price3 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-03"), 'predicted_closing_price': 3123, 'opening_price': 124, 'actual_closing_price': 5124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
  var price4 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-04"), 'predicted_closing_price': 4123, 'opening_price': 124, 'actual_closing_price': 3124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
  var price5 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-05"), 'predicted_closing_price': 5123, 'opening_price': 124, 'actual_closing_price': 4124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
  var price10 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-01"), 'predicted_closing_price': 5123, 'opening_price': 124, 'actual_closing_price': 4124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
  var price20 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-02"), 'predicted_closing_price': 4123, 'opening_price': 124, 'actual_closing_price': 5124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
  var price30 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-03"), 'predicted_closing_price': 3123, 'opening_price': 124, 'actual_closing_price': 1124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
  var price40 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-04"), 'predicted_closing_price': 2123, 'opening_price': 124, 'actual_closing_price': 3124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
  var price50 = { 'id': 0, 'stock': "AMZN", 'date': new Date("2020-01-05"), 'predicted_closing_price': 1123, 'opening_price': 124, 'actual_closing_price': 2124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
  var priceList = [price1, price2, price3, price4, price5]
  var priceList2 = [price10, price20, price30, price40, price50]
  var stocks = [
    {stock: stock1, prices: priceList}, 
    {stock: stock2, prices: priceList2}, 
    {stock: stock3, prices: priceList}, 
    {stock: stock4, prices: priceList2}, 
    {stock: stock5, prices: priceList},
  ]


  return (
    <CapitalizerProvider>
      <Router>
        <NavBar></NavBar>
        <Route path="/">
          <div></div>
        </Route>
        <Route path="/stocks">
          <StockPage></StockPage>
        </Route>
        <Route path="/dashboard">
          <section>
            <DashBoardTable stocks={stocks}></DashBoardTable>
            <DashBoardTable stocks={stocks}></DashBoardTable>
          </section>
        </Route>
      </Router>
    </CapitalizerProvider>
  );
}

export default App;
