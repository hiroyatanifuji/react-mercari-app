import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/HomeComponent/Home";
import Item from "./components/Detail/Item";
import AddComponent from "./components/Add/AddComponent";
import Search from "./components/Bar/Search";


export default class Root extends React.Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add" render={() => <AddComponent />} />
          <Route
            path="/item/:token"
            render={
              ({ match }) => <Item token={match.params.token} />
            }
          />
          <Route path="/searchPage" component={Search} />
        </Switch>
      </div>
    );
  }
};