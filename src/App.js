import React from "react";
import { NavBar } from "./components/NavBar";
import { DashboardPage } from "./Dashboard/Dashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CapitalizerProvider } from "./Context";
import { StockPage } from "./Stocks/Stocks";
import { SignupPage } from "./Signup/Signup";
import { ProfilePage } from "./Profile/Profile";
import "./App.css";

function App() {
  return (
    <CapitalizerProvider>
      <Router>
        <NavBar></NavBar>
        <Route path="/">
          <div></div>
        </Route>
        <Route path="/signup">
          <SignupPage></SignupPage>
        </Route>
        <Route path="/stocks">
          <StockPage></StockPage>
        </Route>
        <Route path="/dashboard">
          <DashboardPage></DashboardPage>
        </Route>
        <Route path="/profile">
          <ProfilePage></ProfilePage>
        </Route>
      </Router>
    </CapitalizerProvider>
  );
}

export default App;
