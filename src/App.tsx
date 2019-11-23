import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AdminPanel } from "src/components/AdminPanel/AdminPanel";
import { Auth } from "src/components/Auth/AuthRouter";
import { HomePage } from "src/components/HomePage";
import { store } from "src/store/store";
import { AppTheme } from "src/Theme";

function App() {
  return (
    <Provider store={store}>
      <AppTheme>
        <BrowserRouter>
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
              <AdminPanel />
            </Route>
          </Switch>
        </BrowserRouter>
      </AppTheme>
    </Provider>
  );
}

export default App;
