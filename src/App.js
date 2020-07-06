import React from "react";
import { NavBar } from "./components/NavBar";
import { DashboardPage } from "./Dashboard/Dashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CapitalizerProvider } from "./Context";
import { StockPage } from "./Stocks/Stocks";
import { ProfilePage } from "./Profile/Profile";
import { LogInPage } from "./LogIn/LogIn";
import "./App.css";

function App() {
  return (
    <CapitalizerProvider>
      <Router>
        <Route path="/stocks">
          <NavBar></NavBar>
          <StockPage></StockPage>
        </Route>
        <Route path="/dashboard">
          <NavBar></NavBar>
          <DashboardPage></DashboardPage>
        </Route>
        <Route path="/profile">
          <NavBar></NavBar>
          <ProfilePage></ProfilePage>
        </Route>
        <Route path="/login">
          <LogInPage></LogInPage>
        </Route>
      </Router>
    </CapitalizerProvider>
  );
}

export default App;
