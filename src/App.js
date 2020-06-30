import React from "react";
import { NavBar } from "./components/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CapitalizerProvider } from "./Context";
import { StockPage } from "./Stocks/Stocks";
import "./App.css";

function App() {
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
      </Router>
    </CapitalizerProvider>
  );
}

export default App;
