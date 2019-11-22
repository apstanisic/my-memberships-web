import React from "react";
import { Box, Card, Paper, CardContent } from "@material-ui/core";
import { useShowView } from "../Common/useShowView";
import { User } from "core/auth/User";
import { ShowViewItem } from "../Common/ShowViewItem";
import { Padding } from "components/common/Padding";

export function UserShow() {
  const [user, Header] = useShowView<User>(User.NAME);
  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent>
        <Header title={user?.name} />
        <div className="flex">
          <div className="w-1/2">
            <Box py={5}>
              <ShowViewItem name="Email" val={user?.email} />
              <ShowViewItem name="Phone number" val={user?.phoneNumber} />
            </Box>
          </div>
          <div className="w-1/2">
            <Box p={3}>
              <Paper>
                <img
                  alt={user?.name}
                  src={user?.avatar?.md}
                  style={{ minHeight: 200 }}
                />
              </Paper>
            </Box>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
