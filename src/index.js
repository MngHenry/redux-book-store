import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
