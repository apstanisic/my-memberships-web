import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Inbox } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "src/store/store";
import { toggleSidebar } from "src/store/uiSlice";
import { Show } from "../AdminPanel/common/ShouldShow";
import { useIsInAdminPanel } from "../AdminPanel/common/hooks/useIsInAdminPanel";
import { resourceUrls } from "src/core/urlHelper";
import { useUrls } from "../AdminPanel/common/hooks/useUrls";

export function AppDrawer({ classes }: { classes: any }) {
  const { ui, admin, auth } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  // const match = useRouteMatch();
  const inAdminPanel = useIsInAdminPanel();
  const urls = useUrls();

  const items = [
    { name: "Subscriptions", path: "subscriptions" },
    { name: "Locations", path: "locations" },
    { name: "Roles", path: "roles" },
    { name: "Arrivals", path: "arrivals" },
    // { name: "Billing", path: "payments" },
  ];

  if (
    auth.user?.roles
      .filter(role => role.domain === admin.url.companyId)
      .find(role => role.name === "owner" || role.name.startsWith("app_"))
  ) {
    items.push({ name: "Billing", path: "payments" });
  }

  const drawerContent = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {/* <ListItem>{admin.url.company?.name}</ListItem> */}
        {items.map((item, i) => (
          // <Link to={urlHelper.changeResource(admin.url, item.path)} key={item.path}>
          <Link to={urls.list({ resourceName: item.path })} key={item.path}>
            <ListItem button key={item.path}>
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <Show If={inAdminPanel}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            open={ui.showSidebar}
            onClose={() => dispatch(toggleSidebar())}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            elevation={20}
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawerContent}
          </Drawer>
        </Hidden>
      </nav>
    </Show>
  );
}
