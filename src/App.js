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
  var price1 = { 'id': 0, 'stock': "AMZN", 'date': "01-01-2020", 'predicted_closing_price': 1123, 'opening_price': 124, 'actual_closing_price': 124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
  var price2 = { 'id': 0, 'stock': "AMZN", 'date': "01-01-2020", 'predicted_closing_price': 2123, 'opening_price': 124, 'actual_closing_price': 124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
  var price3 = { 'id': 0, 'stock': "AMZN", 'date': "01-01-2020", 'predicted_closing_price': 3123, 'opening_price': 124, 'actual_closing_price': 124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
  var price4 = { 'id': 0, 'stock': "AMZN", 'date': "01-01-2020", 'predicted_closing_price': 4123, 'opening_price': 124, 'actual_closing_price': 124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
  var price5 = { 'id': 0, 'stock': "AMZN", 'date': "01-01-2020", 'predicted_closing_price': 5123, 'opening_price': 124, 'actual_closing_price': 124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
  var stocks = [{stock: stock1, price: price1}, {stock: stock2, price: price2}, {stock: stock3, price: price3}, {stock: stock4, price: price4}, {stock: stock5, price: price5}]


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
