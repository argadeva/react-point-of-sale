import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import History from "./components/History";
import Login from "./components/Users/Login";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Users from "./components/Users";
import Sales from "./components/Sales";
import Stocks from "./components/Stocks";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route exact path="/sales" render={props => <Sales {...props} />} />
          <Route
            exact
            path="/history"
            render={props => <History {...props} />}
          />
          <Route exact path="/stocks" render={props => <Stocks {...props} />} />
          <Route
            exact
            path="/categories"
            render={props => <Categories {...props} />}
          />
          <Route
            exact
            path="/products"
            render={props => <Products {...props} />}
          />
          <Route exact path="/users" render={props => <Users {...props} />} />
          <Route render={props => <Login {...props} />} />
        </Switch>
      </Router>
    );
  }
}
