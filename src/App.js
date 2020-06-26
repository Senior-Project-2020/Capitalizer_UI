import React from 'react';
import { NavBar } from './components/NavBar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Route path="/">
        <div></div>
      </Route>
    </Router>
  );
}

export default App;
