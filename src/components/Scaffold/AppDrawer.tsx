import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { Inbox } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "store/store";
import { toggleSidebar } from "store/uiSlice";

export function AppDrawer({ classes }: { classes: any }) {
  const { ui, admin } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const items = [
    { name: "Subscriptions", path: "subscriptions" },
    { name: "Locations", path: "locations" },
    { name: "Roles", path: "roles" },
    { name: "Arrivals", path: "arrivals" },
    { name: "Payments", path: "payments" }
  ];

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {items.map((item, i) => (
          <Link
            to={`/admin-panel/companies/${admin.companyId}/${item.path}`}
            key={item.path}
          >
            <ListItem button key={item.path}>
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          open={ui.showSidebar}
          onClose={() => dispatch(toggleSidebar())}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
