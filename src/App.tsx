import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { store } from "store/store";
import AdminPanel from "./components/AdminPanel/Admin";
import { Auth } from "components/Auth/AuthRouter";

function App() {
  // const [companies, setCompanies] = useState<Company[]>([]);
  // // const AdminPanel = React.lazy(() => import("./AdminPanel/Admin"));

  // useEffect(() => {
  //   auth.init().then(() => {
  //     Http.get<Company[]>("companies/user").then(res => {
  //       setCompanies(res.data);
  //       console.log(auth.user);
  //     });
  //   });
  // }, []);
  // return <AdminPanel />;

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            Home page
          </Route>
          <Route path="/kontakt">Home page</Route>
          <Route path="/o-nama">Home page</Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/panel">
            <AdminPanel />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
