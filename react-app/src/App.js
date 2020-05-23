import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Read} />
        <Route path="/create" exact component={Create} />
        <Route path="/update/:id" exact component={Update} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
