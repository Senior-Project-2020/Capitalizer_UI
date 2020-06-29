import React from "react";
import { NavBar } from "./components/NavBar";
import { SearchBar } from "./components/SearchBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CapitalizerProvider } from "./Context";
import "./App.css";

function App() {
  return (
    <CapitalizerProvider>
      <Router>
        <NavBar></NavBar>
        <Route path="/">
          <SearchBar></SearchBar>
        </Route>
      </Router>
    </CapitalizerProvider>
  );
}

export default App;
