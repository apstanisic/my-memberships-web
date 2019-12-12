import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { auth } from "./core/auth/Auth";
import { store } from "./store/store";
import { initLoginState } from "./components/Auth/authSlice";
import "./out.css";
import "./style.css";

// This is a little dirty. App won't start rendering until we
// initialize auth. It should be very fast, but it's still a
// delay. It's easier for now then to mess around with data
// provider
auth
  .init()
  .then(user => store.dispatch(initLoginState(user)))
  .then(() => {
    ReactDOM.render(<App />, document.getElementById("root"));
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
