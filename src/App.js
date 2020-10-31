import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav.js";
import Search from "./Search.js";

function App() {
  return (
    <Router>
      <div className = "container-fluid">
        <div className = "row">
          <div className = "col-1 side_nav">
            <div className = "mt-3">
              <img className= "ml-2 logo_image" src="logo.png"></img><span className="ml-2 logo">musc</span>
            </div>
            <Nav/>
          </div>
          <main className = "col-8">
            <Switch>
              <Route path="/" exact={true}></Route>
              <Route path="/playlist/:id/songs" exact={true}></Route>
              <Route path="/search/:id" exact={true}></Route>
              <Route path="/search/:id/:song_id" exact={true}></Route>
              <Route path="/*" exact={true}></Route>
            </Switch>
          </main>
          <div className = "col-3">
            <Search/>
          </div>
        </div>
      </div>
    </Router>
   
  );
}

export default App;
