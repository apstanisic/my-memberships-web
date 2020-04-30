import { Box, Card, CardContent, Paper } from "@material-ui/core";
import React from "react";
import { User } from "src/core/auth/User";
import { ShowViewRow } from "../common/ShowViewItem";
import { useShowView } from "../common/hooks/useShowView";

export function UserShow() {
  const { Header, resource: user } = useShowView({
    resourceName: User.NAME,
    transform: User.create,
  });

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent>
        <Header title={user?.name} />
        <div className="flex">
          <div className="w-1/2">
            <Box py={5}>
              <ShowViewRow name="Email" val={user?.email} />
              <ShowViewRow name="Phone number" val={user?.phoneNumber} />
            </Box>
          </div>
          <div className="w-1/2">
            <Box p={3}>
              <Paper>
                <img alt={user?.name} src={user?.avatar?.md} style={{ minHeight: 200 }} />
              </Paper>
            </Box>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
