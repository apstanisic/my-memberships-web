import { List, ListItem, ListItemText, Paper, Box } from "@material-ui/core";
import { Padding } from "src/components/common/Padding";
import { http } from "src/core/http";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { RootState } from "src/store/store";
import { Company } from "./Company/Company";
import { dataProvider } from "src/components/dataProvider";
// import { setCompany } from "src/store/adminSlice";

export function Dashboard() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const { auth } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!auth.isInited) return;

    dataProvider
      .custom()
      .get<Partial<Company>[]>("companies/user")
      .then(res => setCompanies(res.data.map(c => new Company(c))));
  }, [auth.isInited, auth.user]);

  return (
    <Box p={1}>
      <Paper>
        <List component="nav">
          {companies.map((company, i) => (
            <ListItem
              key={company.id}
              onClick={() => {
                // dispatch(setCompany(company.id));
                history.push(`/admin-panel/companies/${company.id}`);
              }}
              button
              divider={i !== companies.length - 1}
            >
              <ListItemText className="text-center" primary={company.name} />
              <ListItemText
                className="text-center"
                primary={
                  auth.user?.roles.find(r => r.domain === company.id)?.name
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
