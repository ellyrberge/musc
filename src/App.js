import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
          <Route path="/" exact={true}></Route>
          <Route path="/playlist/:id/songs" exact={true}></Route>
          <Route path="/search/:id" exact={true}></Route>
          <Route path="/search/:id/:song_id" exact={true}></Route>
      </Switch>
    </Router>
   
  );
}

export default App;
