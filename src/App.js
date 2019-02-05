import React, { Component } from 'react';
import Root from "./Root";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import createStore from "./store";
import createBrowserHistory from "history/createBrowserHistory";
import firebase from "firebase/app";
import "firebase/firestore";
import config from "./config";

//historyインスタンス
const history = createBrowserHistory();

//importした関数
const store = createStore(history);

class App extends Component {
  constructor() {
    super();
    firebase.initializeApp(config);
    firebase.firestore().settings({ timestampsInSnapshots: true });
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter store={store} history={history}>
          <Root />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;