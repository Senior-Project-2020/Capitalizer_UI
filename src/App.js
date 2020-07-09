import React from "react";
import { NavBar } from "./components/NavBar";
import { DashboardPage } from "./Dashboard/Dashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CapitalizerProvider } from "./Context";
import { StockPage } from "./Stocks/Stocks";
import { ProfilePage } from "./Profile/Profile";
import { LogInPage } from "./LogIn/LogIn";
import { AuthToken } from "./components/AuthToken";
import "./App.css";

function App() {
  return (
    <CapitalizerProvider>
      <Router>
        <Route exact path="/" component={LogInPage}/>
        <Route path="/stocks">
          <AuthToken></AuthToken>
          <NavBar></NavBar>
          <StockPage></StockPage>
        </Route>
        <Route path="/dashboard">
          <AuthToken></AuthToken>
          <NavBar></NavBar>
          <DashboardPage></DashboardPage>
        </Route>
        <Route path="/profile">
          <AuthToken></AuthToken>
          <NavBar></NavBar>
          <ProfilePage></ProfilePage>
        </Route>
      </Router>
    </CapitalizerProvider>
  );
}

export default App;
