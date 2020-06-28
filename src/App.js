import React from "react";
import { NavBar } from "./components/NavBar";
import { DashBoardTable } from "./components/DashboardTable";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

function App() {
  var stock = { "name": "Amazon.com Inc.", "symbol": "AMZN", "category": "Information Technology", "stock_prices": [0] };
  var price = { 'id': 0, 'stock': "AMZN", 'date': "01-01-2020", 'predicted_closing_price': 123, 'opening_price': 124, 'actual_closing_price': 124, 'daily_high': 125, 'daily_low': 124, 'volume': 10000 };

  return (
    <Router>
      <NavBar></NavBar>
      <Route path="/">
        <div></div>
      </Route>
      <Route path="/dashboard">
        <section style={{margin: "10px"}}>
          <DashBoardTable stocks={[{stock: stock, price: price}]}></DashBoardTable>
        </section>
      </Route>
    </Router>
  );
}

export default App;
