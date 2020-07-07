import React from "react";
import { NavBar } from "./components/NavBar";
import { NonauthNavBar } from "./components/NonauthNavBar";
import { DashboardPage } from "./Dashboard/Dashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CapitalizerProvider } from "./Context";
import { StockPage } from "./Stocks/Stocks";
import { SignupPage } from "./Signup/Signup";
import { ProfilePage } from "./Profile/Profile";
import { LogInPage } from "./LogIn/LogIn";
import "./App.css";

function App() {
  return (
    <CapitalizerProvider>
      <Router>
        <Route exact path="/" component={LogInPage}/>
        <Route path="/signup">
          <NonauthNavBar></NonauthNavBar>
          <SignupPage></SignupPage>
        </Route>
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
      </Router>
    </CapitalizerProvider>
  );
}

export default App;
