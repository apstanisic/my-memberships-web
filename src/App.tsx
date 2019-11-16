import { CssBaseline } from "@material-ui/core";
import { Auth } from "components/Auth/AuthRouter";
import { HomePage } from "components/HomePage";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import { store, history } from "store/store";
import { AppTheme } from "Theme";
import AdminPanel from "./components/AdminPanel/Admin";
import { NewAdminPanel } from "components/NewAdminPanel/NewAdminPanel";

function App() {
  return (
    <Provider store={store}>
      <AppTheme>
        <CssBaseline />
        <div className="min-h-screen">
          {/* <BrowserRouter> */}
          <Router history={history}>
            {/* <HashRouter> */}
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/kontakt">Home page</Route>
              <Route path="/o-nama">Home page</Route>
              <Route path="/auth">
                <Auth />
              </Route>
              <Route path="/admin-panel">
                <NewAdminPanel />
              </Route>
            </Switch>
            {/* </HashRouter> */}
          </Router>
          {/* </BrowserRouter> */}
        </div>
      </AppTheme>
    </Provider>
  );
}

export default App;
