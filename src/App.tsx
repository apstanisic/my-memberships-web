import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { AdminPanel } from "Admin";
import "./App.css";
import { Http } from "core/http";
import { Company } from "CompanyAdmin/Company/Company";
import { auth } from "core/auth/Auth";

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    auth.init().then(() => {
      Http.get<Company[]>("companies/user").then(res => {
        setCompanies(res.data);
      });
    });
  }, []);

  return (
    <BrowserRouter>
      {companies.map(company => (
        <Link to={`/companies/${company.id}`} key={company.id}>
          {company.name}
        </Link>
      ))}
      <Switch>
        <Route path="/companies/:id">
          <div className="App">
            <AdminPanel />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
