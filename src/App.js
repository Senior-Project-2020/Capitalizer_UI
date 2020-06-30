import React from "react";
import { NavBar } from "./components/NavBar";
import { SearchBar } from "./components/SearchBar";
import { DashBoardTable } from "./components/DashboardTable";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CapitalizerProvider } from "./Context";
import "./App.css";

function App() {
  var stock1 = { "name": "Amazon.com Inc.", "symbol": "AMZN1", "category": "Information Technology", "stock_prices": [0] };
  var stock2 = { "name": "Amazon.com Inc.", "symbol": "AMZN2", "category": "Information Technology", "stock_prices": [0] };
  var stock3 = { "name": "Amazon.com Inc.", "symbol": "AMZN3", "category": "Information Technology", "stock_prices": [0] };
  var stock4 = { "name": "Amazon.com Inc.", "symbol": "AMZN4", "category": "Information Technology", "stock_prices": [0] };
  var stock5 = { "name": "Amazon.com Inc.", "symbol": "AMZN5", "category": "Information Technology", "stock_prices": [0] };
  var price = { 'id': 0, 'stock': "AMZN", 'date': "01-01-2020", 'predicted_closing_price': 123, 'opening_price': 124, 'actual_closing_price': 124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };
  var stocks = [{stock: stock1, price: price}, {stock: stock2, price: price}, {stock: stock3, price: price}, {stock: stock4, price: price}, {stock: stock5, price: price}]


  return (
    <CapitalizerProvider>
      <Router>
        <NavBar></NavBar>
        <Route path="/">
          <SearchBar></SearchBar>
        </Route>
        <Route path="/dashboard">
          <section style={{margin: "10px"}}>
            <DashBoardTable stocks={stocks}></DashBoardTable>
          </section>
        </Route>
      </Router>
    </CapitalizerProvider>
  );
}

export default App;
