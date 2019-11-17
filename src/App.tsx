import { CssBaseline } from "@material-ui/core";
import { Auth } from "components/Auth/AuthRouter";
import { HomePage } from "components/HomePage";
import { NewAdminPanel } from "components/NewAdminPanel/NewAdminPanel";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { store } from "store/store";
import { AppTheme } from "Theme";

function App() {
  return (
    <Provider store={store}>
      <AppTheme>
        <CssBaseline />
        {/* <div className="min-h-screen"> */}
        {/* <BrowserRouter> */}
        <BrowserRouter>
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
        </BrowserRouter>
        {/* </BrowserRouter> */}
        {/* </div> */}
      </AppTheme>
    </Provider>
  );
}

export default App;
