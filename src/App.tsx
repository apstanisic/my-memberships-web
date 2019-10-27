import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { AdminPanel } from "Admin";
import "./App.css";
import { Http } from "core/http";
import { Company } from "AdminPanel/Company/Company";
import { auth } from "core/auth/Auth";

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    auth.init().then(() => {
      Http.get<Company[]>("companies/user").then(res => {
        setCompanies(res.data);
        console.log(auth.user);
      });
    });
  }, []);

  return (
    <BrowserRouter>
      {/* {auth.user} */}
      <Switch>
        {/* <Route path="/">
          <div>
            {companies.map(company => (
              <Link to={`/companies/${company.id}`} key={company.id}>
                {company.name}
                {"   "}
                {
                  auth.user!.roles.filter(role => role.domain === company.id)[0]
                    .name
                }
                <br />
              </Link>
            ))}
          </div>
        </Route> */}

        {/* <Route>
          <AdminPanel></AdminPanel>
        </Route> */}
        <Route path="/companies/:id">
          <div className="App">{auth.user && <AdminPanel />}</div>
        </Route>
        {/* <Route>
          <AdminPanel />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
